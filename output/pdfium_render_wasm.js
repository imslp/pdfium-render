let wasm_bindgen;
(function() {
    const __exports = {};
    let script_src;
    if (typeof document !== 'undefined' && document.currentScript !== null) {
        script_src = new URL(document.currentScript.src, location.href).toString();
    }
    let wasm = undefined;

    const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

    if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); };

    let cachedUint8ArrayMemory0 = null;

    function getUint8ArrayMemory0() {
        if (cachedUint8ArrayMemory0 === null || cachedUint8ArrayMemory0.byteLength === 0) {
            cachedUint8ArrayMemory0 = new Uint8Array(wasm.memory.buffer);
        }
        return cachedUint8ArrayMemory0;
    }

    function getStringFromWasm0(ptr, len) {
        ptr = ptr >>> 0;
        return cachedTextDecoder.decode(getUint8ArrayMemory0().subarray(ptr, ptr + len));
    }

    function isLikeNone(x) {
        return x === undefined || x === null;
    }

    let cachedDataViewMemory0 = null;

    function getDataViewMemory0() {
        if (cachedDataViewMemory0 === null || cachedDataViewMemory0.buffer.detached === true || (cachedDataViewMemory0.buffer.detached === undefined && cachedDataViewMemory0.buffer !== wasm.memory.buffer)) {
            cachedDataViewMemory0 = new DataView(wasm.memory.buffer);
        }
        return cachedDataViewMemory0;
    }

    let WASM_VECTOR_LEN = 0;

    const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

    const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
        ? function (arg, view) {
        return cachedTextEncoder.encodeInto(arg, view);
    }
        : function (arg, view) {
        const buf = cachedTextEncoder.encode(arg);
        view.set(buf);
        return {
            read: arg.length,
            written: buf.length
        };
    });

    function passStringToWasm0(arg, malloc, realloc) {

        if (realloc === undefined) {
            const buf = cachedTextEncoder.encode(arg);
            const ptr = malloc(buf.length, 1) >>> 0;
            getUint8ArrayMemory0().subarray(ptr, ptr + buf.length).set(buf);
            WASM_VECTOR_LEN = buf.length;
            return ptr;
        }

        let len = arg.length;
        let ptr = malloc(len, 1) >>> 0;

        const mem = getUint8ArrayMemory0();

        let offset = 0;

        for (; offset < len; offset++) {
            const code = arg.charCodeAt(offset);
            if (code > 0x7F) break;
            mem[ptr + offset] = code;
        }

        if (offset !== len) {
            if (offset !== 0) {
                arg = arg.slice(offset);
            }
            ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
            const view = getUint8ArrayMemory0().subarray(ptr + offset, ptr + len);
            const ret = encodeString(arg, view);

            offset += ret.written;
            ptr = realloc(ptr, len, offset, 1) >>> 0;
        }

        WASM_VECTOR_LEN = offset;
        return ptr;
    }

    function debugString(val) {
        // primitive types
        const type = typeof val;
        if (type == 'number' || type == 'boolean' || val == null) {
            return  `${val}`;
        }
        if (type == 'string') {
            return `"${val}"`;
        }
        if (type == 'symbol') {
            const description = val.description;
            if (description == null) {
                return 'Symbol';
            } else {
                return `Symbol(${description})`;
            }
        }
        if (type == 'function') {
            const name = val.name;
            if (typeof name == 'string' && name.length > 0) {
                return `Function(${name})`;
            } else {
                return 'Function';
            }
        }
        // objects
        if (Array.isArray(val)) {
            const length = val.length;
            let debug = '[';
            if (length > 0) {
                debug += debugString(val[0]);
            }
            for(let i = 1; i < length; i++) {
                debug += ', ' + debugString(val[i]);
            }
            debug += ']';
            return debug;
        }
        // Test for built-in
        const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
        let className;
        if (builtInMatches.length > 1) {
            className = builtInMatches[1];
        } else {
            // Failed to match the standard '[object ClassName]'
            return toString.call(val);
        }
        if (className == 'Object') {
            // we're a user defined class or Object
            // JSON.stringify avoids problems with cycles, and is generally much
            // easier than looping through ownProperties of `val`.
            try {
                return 'Object(' + JSON.stringify(val) + ')';
            } catch (_) {
                return 'Object';
            }
        }
        // errors
        if (val instanceof Error) {
            return `${val.name}: ${val.message}\n${val.stack}`;
        }
        // TODO we could test for more things here, like `Set`s and `Map`s.
        return className;
    }

    const CLOSURE_DTORS = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(state => {
    wasm.__wbindgen_export_3.get(state.dtor)(state.a, state.b)
});

function makeMutClosure(arg0, arg1, dtor, f) {
    const state = { a: arg0, b: arg1, cnt: 1, dtor };
    const real = (...args) => {
        // First up with a closure we increment the internal reference
        // count. This ensures that the Rust closure environment won't
        // be deallocated while we're invoking it.
        state.cnt++;
        const a = state.a;
        state.a = 0;
        try {
            return f(a, state.b, ...args);
        } finally {
            if (--state.cnt === 0) {
                wasm.__wbindgen_export_3.get(state.dtor)(a, state.b);
                CLOSURE_DTORS.unregister(state);
            } else {
                state.a = a;
            }
        }
    };
    real.original = state;
    CLOSURE_DTORS.register(real, state, state);
    return real;
}
function __wbg_adapter_32(arg0, arg1, arg2) {
    wasm.closure776_externref_shim(arg0, arg1, arg2);
}

function takeFromExternrefTable0(idx) {
    const value = wasm.__wbindgen_export_2.get(idx);
    wasm.__externref_table_dealloc(idx);
    return value;
}
/**
 * @param {Blob} blob
 * @returns {Promise<Document>}
 */
__exports.get_document = function(blob) {
    const ret = wasm.get_document(blob);
    return ret;
};

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
__exports.initialize_pdfium_render = function(pdfium_wasm_module, local_wasm_module, debug) {
    const ret = wasm.initialize_pdfium_render(pdfium_wasm_module, local_wasm_module, debug);
    return ret !== 0;
};

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
__exports.read_block_from_callback_wasm = function(param, position, pBuf, size) {
    const ret = wasm.read_block_from_callback_wasm(param, position, pBuf, size);
    return ret;
};

/**
 * A callback function that can be invoked by Pdfium's `FPDF_SaveAsCopy()` and `FPDF_SaveWithVersion()`
 * functions, wrapping around `crate::utils::files::write_block_from_callback()` to shuffle data buffers
 * from Pdfium's WASM memory heap to our WASM memory heap as they are written.
 * @param {number} param
 * @param {number} buf
 * @param {number} size
 * @returns {number}
 */
__exports.write_block_from_callback_wasm = function(param, buf, size) {
    const ret = wasm.write_block_from_callback_wasm(param, buf, size);
    return ret;
};

function getFromExternrefTable0(idx) { return wasm.__wbindgen_export_2.get(idx); }

function getCachedStringFromWasm0(ptr, len) {
    if (ptr === 0) {
        return getFromExternrefTable0(len);
    } else {
        return getStringFromWasm0(ptr, len);
    }
}

function notDefined(what) { return () => { throw new Error(`${what} is not defined`); }; }

let cachedUint8ClampedArrayMemory0 = null;

function getUint8ClampedArrayMemory0() {
    if (cachedUint8ClampedArrayMemory0 === null || cachedUint8ClampedArrayMemory0.byteLength === 0) {
        cachedUint8ClampedArrayMemory0 = new Uint8ClampedArray(wasm.memory.buffer);
    }
    return cachedUint8ClampedArrayMemory0;
}

function getClampedArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ClampedArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}

function addToExternrefTable0(obj) {
    const idx = wasm.__externref_table_alloc();
    wasm.__wbindgen_export_2.set(idx, obj);
    return idx;
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        const idx = addToExternrefTable0(e);
        wasm.__wbindgen_exn_store(idx);
    }
}

function getArrayU8FromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return getUint8ArrayMemory0().subarray(ptr / 1, ptr / 1 + len);
}
function __wbg_adapter_110(arg0, arg1, arg2, arg3) {
    wasm.closure800_externref_shim(arg0, arg1, arg2, arg3);
}

const DocumentFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_document_free(ptr >>> 0, 1));

class Document {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Document.prototype);
        obj.__wbg_ptr = ptr;
        DocumentFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        DocumentFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_document_free(ptr, 0);
    }
    /**
     * @param {Blob} blob
     */
    constructor(blob) {
        const ret = wasm.document_new(blob);
        return ret;
    }
    /**
     * @returns {number}
     */
    get_page_count() {
        const ret = wasm.document_get_page_count(this.__wbg_ptr);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return ret[0] >>> 0;
    }
    /**
     * @param {number} index
     * @returns {any}
     */
    get_page_raw_size(index) {
        const ret = wasm.document_get_page_raw_size(this.__wbg_ptr, index);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    /**
     * @param {number} index
     * @param {number} scale
     * @returns {ImageData}
     */
    get_page_image_data(index, scale) {
        const ret = wasm.document_get_page_image_data(this.__wbg_ptr, index, scale);
        if (ret[2]) {
            throw takeFromExternrefTable0(ret[1]);
        }
        return takeFromExternrefTable0(ret[0]);
    }
    destroy() {
        const ptr = this.__destroy_into_raw();
        wasm.document_destroy(ptr);
    }
}
__exports.Document = Document;

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve Wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return ret;
    };
    imports.wbg.__wbindgen_number_new = function(arg0) {
        const ret = arg0;
        return ret;
    };
    imports.wbg.__wbg_document_new = function(arg0) {
        const ret = Document.__wrap(arg0);
        return ret;
    };
    imports.wbg.__wbindgen_cb_drop = function(arg0) {
        const obj = arg0.original;
        if (obj.cnt-- == 1) {
            obj.a = 0;
            return true;
        }
        const ret = false;
        return ret;
    };
    imports.wbg.__wbindgen_jsval_eq = function(arg0, arg1) {
        const ret = arg0 === arg1;
        return ret;
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getDataViewMemory0().setFloat64(arg0 + 8 * 1, isLikeNone(ret) ? 0 : ret, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, !isLikeNone(ret), true);
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = arg0 === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = arg1;
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        var len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = arg0;
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return ret;
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = arg1.stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
        const len1 = WASM_VECTOR_LEN;
        getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
        getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        var v0 = getCachedStringFromWasm0(arg0, arg1);
    if (arg0 !== 0) { wasm.__wbindgen_free(arg0, arg1, 1); }
    console.error(v0);
};
imports.wbg.__wbg_queueMicrotask_848aa4969108a57e = function(arg0) {
    const ret = arg0.queueMicrotask;
    return ret;
};
imports.wbg.__wbindgen_is_function = function(arg0) {
    const ret = typeof(arg0) === 'function';
    return ret;
};
imports.wbg.__wbg_queueMicrotask_c5419c06eab41e73 = typeof queueMicrotask == 'function' ? queueMicrotask : notDefined('queueMicrotask');
imports.wbg.__wbg_debug_69675dd374e2c249 = typeof console.debug == 'function' ? console.debug : notDefined('console.debug');
imports.wbg.__wbg_error_53abcd6a461f73d8 = typeof console.error == 'function' ? console.error : notDefined('console.error');
imports.wbg.__wbg_info_f073b719c8035bbf = typeof console.info == 'function' ? console.info : notDefined('console.info');
imports.wbg.__wbg_log_f740dc2253ea759b = typeof console.log == 'function' ? console.log : notDefined('console.log');
imports.wbg.__wbg_warn_41503a1c2194de89 = typeof console.warn == 'function' ? console.warn : notDefined('console.warn');
imports.wbg.__wbg_arrayBuffer_b399ae237d35f149 = function(arg0) {
    const ret = arg0.arrayBuffer();
    return ret;
};
imports.wbg.__wbg_newwithu8clampedarrayandsh_585baa1bdfc0d2e2 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = new ImageData(getClampedArrayU8FromWasm0(arg0, arg1), arg2 >>> 0, arg3 >>> 0);
    return ret;
}, arguments) };
imports.wbg.__wbg_newwithlabel_a47b43b4a2a65f79 = function() { return handleError(function (arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    const ret = new TextDecoder(v0);
    return ret;
}, arguments) };
imports.wbg.__wbg_decode_439da469e20f012b = function() { return handleError(function (arg0, arg1, arg2, arg3) {
    const ret = arg1.decode(getArrayU8FromWasm0(arg2, arg3));
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
}, arguments) };
imports.wbg.__wbg_get_5419cf6b954aa11d = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};
imports.wbg.__wbg_length_f217bbbf7e8e4df4 = function(arg0) {
    const ret = arg0.length;
    return ret;
};
imports.wbg.__wbg_new_034f913e7636e987 = function() {
    const ret = new Array();
    return ret;
};
imports.wbg.__wbg_newnoargs_1ede4bf2ebbaaf43 = function(arg0, arg1) {
    var v0 = getCachedStringFromWasm0(arg0, arg1);
    const ret = new Function(v0);
    return ret;
};
imports.wbg.__wbg_get_ef828680c64da212 = function() { return handleError(function (arg0, arg1) {
    const ret = Reflect.get(arg0, arg1);
    return ret;
}, arguments) };
imports.wbg.__wbg_call_a9ef466721e824f2 = function() { return handleError(function (arg0, arg1) {
    const ret = arg0.call(arg1);
    return ret;
}, arguments) };
imports.wbg.__wbg_new_e69b5f66fda8f13c = function() {
    const ret = new Object();
    return ret;
};
imports.wbg.__wbg_self_bf91bf94d9e04084 = function() { return handleError(function () {
    const ret = self.self;
    return ret;
}, arguments) };
imports.wbg.__wbg_window_52dd9f07d03fd5f8 = function() { return handleError(function () {
    const ret = window.window;
    return ret;
}, arguments) };
imports.wbg.__wbg_globalThis_05c129bf37fcf1be = function() { return handleError(function () {
    const ret = globalThis.globalThis;
    return ret;
}, arguments) };
imports.wbg.__wbg_global_3eca19bb09e9c484 = function() { return handleError(function () {
    const ret = global.global;
    return ret;
}, arguments) };
imports.wbg.__wbg_newwithlength_310c7b54443dbe66 = function(arg0) {
    const ret = new Array(arg0 >>> 0);
    return ret;
};
imports.wbg.__wbg_set_425e70f7c64ac962 = function(arg0, arg1, arg2) {
    arg0[arg1 >>> 0] = arg2;
};
imports.wbg.__wbg_from_91a67a5f04c98a54 = function(arg0) {
    const ret = Array.from(arg0);
    return ret;
};
imports.wbg.__wbg_isArray_6f3b47f09adb61b5 = function(arg0) {
    const ret = Array.isArray(arg0);
    return ret;
};
imports.wbg.__wbg_of_064d1507296514c2 = function(arg0) {
    const ret = Array.of(arg0);
    return ret;
};
imports.wbg.__wbg_of_7e03bb557d6a64cc = function(arg0, arg1) {
    const ret = Array.of(arg0, arg1);
    return ret;
};
imports.wbg.__wbg_of_89e8c832a3ab551d = function(arg0, arg1, arg2) {
    const ret = Array.of(arg0, arg1, arg2);
    return ret;
};
imports.wbg.__wbg_of_965ba9e8803ca29f = function(arg0, arg1, arg2, arg3) {
    const ret = Array.of(arg0, arg1, arg2, arg3);
    return ret;
};
imports.wbg.__wbg_of_db106a8bd17aa2a4 = function(arg0, arg1, arg2, arg3, arg4) {
    const ret = Array.of(arg0, arg1, arg2, arg3, arg4);
    return ret;
};
imports.wbg.__wbg_push_36cf4d81d7da33d1 = function(arg0, arg1) {
    const ret = arg0.push(arg1);
    return ret;
};
imports.wbg.__wbg_apply_c37b42ff44b0469d = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.apply(arg1, arg2);
    return ret;
}, arguments) };
imports.wbg.__wbg_call_3bfa248576352471 = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = arg0.call(arg1, arg2);
    return ret;
}, arguments) };
imports.wbg.__wbg_length_a4ab58c2da94e528 = function(arg0) {
    const ret = arg0.length;
    return ret;
};
imports.wbg.__wbg_new_1073970097e5a420 = function(arg0, arg1) {
    try {
        var state0 = {a: arg0, b: arg1};
        var cb0 = (arg0, arg1) => {
            const a = state0.a;
            state0.a = 0;
            try {
                return __wbg_adapter_110(a, state0.b, arg0, arg1);
            } finally {
                state0.a = a;
            }
        };
        const ret = new Promise(cb0);
        return ret;
    } finally {
        state0.a = state0.b = 0;
    }
};
imports.wbg.__wbg_resolve_0aad7c1484731c99 = function(arg0) {
    const ret = Promise.resolve(arg0);
    return ret;
};
imports.wbg.__wbg_then_748f75edfb032440 = function(arg0, arg1) {
    const ret = arg0.then(arg1);
    return ret;
};
imports.wbg.__wbg_then_4866a7d9f55d8f3e = function(arg0, arg1, arg2) {
    const ret = arg0.then(arg1, arg2);
    return ret;
};
imports.wbg.__wbg_buffer_ccaed51a635d8a2d = function(arg0) {
    const ret = arg0.buffer;
    return ret;
};
imports.wbg.__wbg_newwithbyteoffsetandlength_7e3eb787208af730 = function(arg0, arg1, arg2) {
    const ret = new Uint8Array(arg0, arg1 >>> 0, arg2 >>> 0);
    return ret;
};
imports.wbg.__wbg_new_fec2611eb9180f95 = function(arg0) {
    const ret = new Uint8Array(arg0);
    return ret;
};
imports.wbg.__wbg_set_ec2fcf81bc573fd9 = function(arg0, arg1, arg2) {
    arg0.set(arg1, arg2 >>> 0);
};
imports.wbg.__wbg_length_9254c4bd3b9f23c4 = function(arg0) {
    const ret = arg0.length;
    return ret;
};
imports.wbg.__wbg_subarray_975a06f9dbd16995 = function(arg0, arg1, arg2) {
    const ret = arg0.subarray(arg1 >>> 0, arg2 >>> 0);
    return ret;
};
imports.wbg.__wbg_slice_438c4990649d1881 = function(arg0, arg1, arg2) {
    const ret = arg0.slice(arg1 >>> 0, arg2 >>> 0);
    return ret;
};
imports.wbg.__wbg_getindex_146612fa21bd6845 = function(arg0, arg1) {
    const ret = arg0[arg1 >>> 0];
    return ret;
};
imports.wbg.__wbg_set_e864d25d9b399c9f = function() { return handleError(function (arg0, arg1, arg2) {
    const ret = Reflect.set(arg0, arg1, arg2);
    return ret;
}, arguments) };
imports.wbg.__wbg_length_e7869718b0baff3b = function(arg0) {
    const ret = arg0.length;
    return ret;
};
imports.wbg.__wbg_get_7eb27976902923de = function() { return handleError(function (arg0, arg1) {
    const ret = arg0.get(arg1 >>> 0);
    return ret;
}, arguments) };
imports.wbg.__wbg_set_57345637c6ee7179 = function() { return handleError(function (arg0, arg1, arg2) {
    arg0.set(arg1 >>> 0, arg2);
}, arguments) };
imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
    const ret = debugString(arg1);
    const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_malloc, wasm.__wbindgen_realloc);
    const len1 = WASM_VECTOR_LEN;
    getDataViewMemory0().setInt32(arg0 + 4 * 1, len1, true);
    getDataViewMemory0().setInt32(arg0 + 4 * 0, ptr1, true);
};
imports.wbg.__wbindgen_throw = function(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};
imports.wbg.__wbindgen_memory = function() {
    const ret = wasm.memory;
    return ret;
};
imports.wbg.__wbindgen_closure_wrapper1401 = function(arg0, arg1, arg2) {
    const ret = makeMutClosure(arg0, arg1, 777, __wbg_adapter_32);
    return ret;
};
imports.wbg.__wbindgen_init_externref_table = function() {
    const table = wasm.__wbindgen_export_2;
    const offset = table.grow(4);
    table.set(0, undefined);
    table.set(offset + 0, undefined);
    table.set(offset + 1, null);
    table.set(offset + 2, true);
    table.set(offset + 3, false);
    ;
};

return imports;
}

function __wbg_init_memory(imports, memory) {

}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedDataViewMemory0 = null;
    cachedUint8ArrayMemory0 = null;
    cachedUint8ClampedArrayMemory0 = null;


    wasm.__wbindgen_start();
    return wasm;
}

function initSync(module) {
    if (wasm !== undefined) return wasm;


    if (typeof module !== 'undefined') {
        if (Object.getPrototypeOf(module) === Object.prototype) {
            ({module} = module)
        } else {
            console.warn('using deprecated parameters for `initSync()`; pass a single object instead')
        }
    }

    const imports = __wbg_get_imports();

    __wbg_init_memory(imports);

    if (!(module instanceof WebAssembly.Module)) {
        module = new WebAssembly.Module(module);
    }

    const instance = new WebAssembly.Instance(module, imports);

    return __wbg_finalize_init(instance, module);
}

async function __wbg_init(module_or_path) {
    if (wasm !== undefined) return wasm;


    if (typeof module_or_path !== 'undefined') {
        if (Object.getPrototypeOf(module_or_path) === Object.prototype) {
            ({module_or_path} = module_or_path)
        } else {
            console.warn('using deprecated parameters for the initialization function; pass a single object instead')
        }
    }

    if (typeof module_or_path === 'undefined' && typeof script_src !== 'undefined') {
        module_or_path = script_src.replace(/\.js$/, '_bg.wasm');
    }
    const imports = __wbg_get_imports();

    if (typeof module_or_path === 'string' || (typeof Request === 'function' && module_or_path instanceof Request) || (typeof URL === 'function' && module_or_path instanceof URL)) {
        module_or_path = fetch(module_or_path);
    }

    __wbg_init_memory(imports);

    const { instance, module } = await __wbg_load(await module_or_path, imports);

    return __wbg_finalize_init(instance, module);
}

wasm_bindgen = Object.assign(__wbg_init, { initSync }, __exports);

})();
