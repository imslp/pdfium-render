declare namespace wasm_bindgen {
	/* tslint:disable */
	/* eslint-disable */
	/**
	 * @param {Blob} blob
	 * @returns {Promise<Document>}
	 */
	export function get_document(blob: Blob): Promise<Document>;
	/**
	 * Establishes a binding between an external Pdfium WASM module and `pdfium-render`'s WASM module.
	 * This function should be called from Javascript once the external Pdfium WASM module has been loaded
	 * into the browser. It is essential that this function is called _before_ initializing
	 * `pdfium-render` from within Rust code. For an example, see:
	 * <https://github.com/ajrcarey/pdfium-render/blob/master/examples/index.html>
	 * @param {any} pdfium_wasm_module
	 * @param {any} local_wasm_module
	 * @param {boolean} debug
	 * @returns {boolean}
	 */
	export function initialize_pdfium_render(pdfium_wasm_module: any, local_wasm_module: any, debug: boolean): boolean;
	/**
	 * A callback function that can be invoked by Pdfium's `FPDF_LoadCustomDocument()` function,
	 * wrapping around `crate::utils::files::read_block_from_callback()` to shuffle data buffers
	 * from our WASM memory heap to Pdfium's WASM memory heap as they are loaded.
	 * @param {number} param
	 * @param {number} position
	 * @param {number} pBuf
	 * @param {number} size
	 * @returns {number}
	 */
	export function read_block_from_callback_wasm(param: number, position: number, pBuf: number, size: number): number;
	/**
	 * A callback function that can be invoked by Pdfium's `FPDF_SaveAsCopy()` and `FPDF_SaveWithVersion()`
	 * functions, wrapping around `crate::utils::files::write_block_from_callback()` to shuffle data buffers
	 * from Pdfium's WASM memory heap to our WASM memory heap as they are written.
	 * @param {number} param
	 * @param {number} buf
	 * @param {number} size
	 * @returns {number}
	 */
	export function write_block_from_callback_wasm(param: number, buf: number, size: number): number;
	export class Document {
	  free(): void;
	  /**
	   * @param {Blob} blob
	   */
	  constructor(blob: Blob);
	  /**
	   * @returns {number}
	   */
	  get_page_count(): number;
	  /**
	   * @param {number} index
	   * @returns {any}
	   */
	  get_page_raw_size(index: number): any;
	  /**
	   * @param {number} index
	   * @param {number} scale
	   * @returns {ImageData}
	   */
	  get_page_image_data(index: number, scale: number): ImageData;
	  destroy(): void;
	}
	
}

declare type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

declare interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_document_free: (a: number, b: number) => void;
  readonly document_new: (a: number) => number;
  readonly document_get_page_count: (a: number) => Array;
  readonly document_get_page_raw_size: (a: number, b: number) => Array;
  readonly document_get_page_image_data: (a: number, b: number, c: number) => Array;
  readonly document_destroy: (a: number) => void;
  readonly get_document: (a: number) => number;
  readonly initialize_pdfium_render: (a: number, b: number, c: number) => number;
  readonly read_block_from_callback_wasm: (a: number, b: number, c: number, d: number) => number;
  readonly write_block_from_callback_wasm: (a: number, b: number, c: number) => number;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: WebAssembly.Table;
  readonly __wbindgen_export_3: WebAssembly.Table;
  readonly closure776_externref_shim: (a: number, b: number, c: number) => void;
  readonly __externref_table_dealloc: (a: number) => void;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __externref_table_alloc: () => number;
  readonly closure800_externref_shim: (a: number, b: number, c: number, d: number) => void;
  readonly __wbindgen_start: () => void;
}

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {{ module_or_path: InitInput | Promise<InitInput> }} module_or_path - Passing `InitInput` directly is deprecated.
*
* @returns {Promise<InitOutput>}
*/
declare function wasm_bindgen (module_or_path?: { module_or_path: InitInput | Promise<InitInput> } | InitInput | Promise<InitInput>): Promise<InitOutput>;
