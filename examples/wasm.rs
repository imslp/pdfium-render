#[cfg(target_arch = "wasm32")]
use js_sys::{Object, Reflect, Uint8Array};
#[cfg(target_arch = "wasm32")]
use pdfium_render::prelude::*;
#[cfg(target_arch = "wasm32")]
use std::{cell::RefCell, convert::TryFrom};
#[cfg(target_arch = "wasm32")]
use wasm_bindgen::prelude::*;
#[cfg(target_arch = "wasm32")]
use wasm_bindgen_futures::JsFuture;
#[cfg(target_arch = "wasm32")]
use web_sys::ImageData;

thread_local! {
    static PDFIUM: RefCell<Option<Pdfium>> = RefCell::new(None);
}

fn with_pdfium<F, R>(f: F) -> R
where
    F: FnOnce(&Pdfium) -> R,
{
    PDFIUM.with(|pdfium| {
        let mut pdfium = pdfium.borrow_mut();
        if pdfium.is_none() {
            *pdfium = Some(Pdfium::default());
        }
        f(pdfium.as_ref().unwrap())
    })
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub struct Document {
    bytes: Vec<u8>,
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
impl Document {
    #[wasm_bindgen(constructor)]
    pub async fn new(blob: web_sys::Blob) -> Result<Document, JsValue> {
        let array_buffer = JsFuture::from(blob.array_buffer()).await?;
        let uint8_array = Uint8Array::new(&array_buffer);
        let bytes = uint8_array.to_vec();
        Ok(Document { bytes })
    }

    pub fn get_page_count(&self) -> Result<u32, JsValue> {
        with_pdfium(|pdfium| {
            let document = pdfium
                .load_pdf_from_byte_vec(self.bytes.clone(), None)
                .map_err(|e| JsValue::from_str(&format!("{:?}", e)))?;
            Ok(document.pages().len() as u32)
        })
    }

    pub fn get_page_raw_size(&self, index: u32) -> Result<JsValue, JsValue> {
        with_pdfium(|pdfium| {
            let document = pdfium
                .load_pdf_from_byte_vec(self.bytes.clone(), None)
                .map_err(|e| JsValue::from_str(&format!("{:?}", e)))?;

            let page = document
                .pages()
                .get(u16::try_from(index).map_err(|e| JsValue::from_str(&format!("{:?}", e)))?)
                .map_err(|e| JsValue::from_str(&format!("{:?}", e)))?;

            let obj = Object::new();
            Reflect::set(
                &obj,
                &"width".into(),
                &JsValue::from_f64(page.width().value as f64),
            )?;
            Reflect::set(
                &obj,
                &"height".into(),
                &JsValue::from_f64(page.height().value as f64),
            )?;
            Ok(obj.into())
        })
    }

    pub fn get_page_image_data(&self, index: u32, scale: f32) -> Result<ImageData, JsValue> {
        with_pdfium(|pdfium| {
            let document = pdfium
                .load_pdf_from_byte_vec(self.bytes.clone(), None)
                .map_err(|e| JsValue::from_str(&format!("{:?}", e)))?;

            let page = document
                .pages()
                .get(u16::try_from(index).map_err(|e| JsValue::from_str(&format!("{:?}", e)))?)
                .map_err(|e| JsValue::from_str(&format!("{:?}", e)))?;

            let width = (page.width().value as f32 * scale) as u16;
            let height = (page.height().value as f32 * scale) as u16;

            let bitmap = page
                .render_with_config(
                    &PdfRenderConfig::new()
                        .set_target_size(Pixels::from(width), Pixels::from(height))
                        .render_form_data(true),
                )
                .map_err(|e| JsValue::from_str(&format!("{:?}", e)))?;

            bitmap
                .as_image_data()
                .map_err(|e| JsValue::from_str(&format!("{:?}", e)))
        })
    }

    pub fn destroy(self) {
        drop(self);
    }
}

#[cfg(target_arch = "wasm32")]
#[wasm_bindgen]
pub async fn get_document(blob: web_sys::Blob) -> Result<Document, JsValue> {
    Document::new(blob).await
}

// Required for wasm-pack
#[allow(dead_code)]
fn main() {}
