const path = require('path');
const express = require('express');
const multer = require('multer');

const app = express();
const port = 8080;

const storage = multer.diskStorage({
    destination : function (req, file, cb) {
        return cb(null, "./uploads");
    },
    filename : function (req, file, cb) {
        return cb(null, `${Date.now()}-${file.originalname}`);
    }
})


// Whatever will be get uploade from the frontend , put it inside the uploads folder
const upload = multer({ storage })

app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));


// app.use(express.json());

// Note - It help in parsing the form data
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
    return res.render("HomePage");
})

app.post('/uploads', upload.single('profileImage'), (req, res) => {
   console.log(req.body);
   console.log(req.file);

   return res.redirect('/');
});

app.listen(port, function(err){
    if(err){
        console.log(err);
        return;
    }
    console.log(`Server is listening at ${port}`);
})