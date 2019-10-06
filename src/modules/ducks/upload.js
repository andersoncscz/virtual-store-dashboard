export const Types = {
    PUSH: "PUSH",
    CLEAN: "CLEAN",
    DELETE: "DELETE",
    ALLOW_UPLOAD: "ALLOW_UPLOAD",
    START_UPLOAD: "START_UPLOAD",
    UPLOAD_SAGA: "UPLOAD_SAGA",
    UPDATE_PROGRESS: "UPDATE_PROGRESS",
    UPDATE_PROGRESS_SAGA: "UPDATE_PROGRESS_SAGA",
    SUCCESS: "SUCCESS",
    ERROR: "ERROR",
}


const INITIAL_STATE = {
    product: {},
    error: false,
    success: false,
    isUploading: false,
    storageRef: '',
    files: [],
}

export default function uploadReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case Types.PUSH: 
        case Types.DELETE: 
        case Types.ALLOW_UPLOAD: 
        case Types.START_UPLOAD: 
        case Types.UPDATE_PROGRESS: 
        case Types.SUCCESS:
        case Types.ERROR:
            return {
                ...state, 
                ...action.payload
            };
        case Types.CLEAN:
            return INITIAL_STATE
        default:
            return state;
    }
}

export const Creators = {
    
    cleanFileList: () => ({ 
        type: Types.CLEAN
    }),

    pushFiles: (files) => ({
        type: Types.PUSH,
        payload: {
            product: {},
            error: false,
            success: false,
            isUploading: false,
            files
        }
    }),    
    
    allowUpload: (storageRef, product) => ({
        type: Types.ALLOW_UPLOAD,
        payload: {
            product,
            storageRef,
        }
    }),

    uploadFiles: (files) => ({
        type: Types.START_UPLOAD,
        payload: {
            isUploading: true,
            files,
        }
    }),

    updateProgress: (files) => ({
        type: Types.UPDATE_PROGRESS,
        payload: {
            files
        }
    }),   

    uploadSuccess: () => ({
        type: Types.SUCCESS,
        payload: {
            error: false,
            success: true,
            isUploading: false,
        }
    }),

    uploadError: () => ({
        type: Types.ERROR,
        payload: {
            error: true,
            isUploading: false,
        }
    }),    

    deleteAfterUploaded: (files) => ({
        type: Types.DELETE,
        payload: {
            files
        }
    }),       

    uploadFilesSaga: (files) => ({
        type: Types.UPLOAD_SAGA,
        payload: {
            files
        }
    }),     


    updateProgressSaga: (files) => ({
        type: Types.UPDATE_PROGRESS_SAGA,
        payload: {
            files
        }
    }),       
}