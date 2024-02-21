import multer from "multer";

 const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/resume')
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now()+'_'+file.originalname;
      cb(null, uniqueName);
    }
  })

  export const upload = multer({ storage: storage, })
