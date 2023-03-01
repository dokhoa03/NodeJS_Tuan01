var express = require("express");
var router = express.Router();
var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/BT_Tuan1", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
});

let sinhvienSchema = mongoose.Schema({
    maSinhVien: {
        type: String,
    },
    ngaySinh: {
        type: String,
    },
    gioiTinh: {
        type: String,
    },
    queQuan: {
        type: String,
    },
});

let Sinh_vien = mongoose.model("sinhviens", sinhvienSchema);

/* GET home page. */
router.get("/", function(req, res, next) {
    Sinh_vien.find({}, (error, data) => {
        res.render("index", { sinhviens: data });
    });
});

router.get("/form-add", function(req, res, next) {
    res.render("form-add", {});
});

router.post("/add", function(req, res, next) {
    Sinh_vien.create(req.body);
    res.redirect("/");
});

router.get("/form-update/:id", function(req, res, next) {
    Sinh_vien.findById(req.params.id, (error, data) => {
        res.render("form-update", { sinhviens: data });
    });
});

router.post("/update", function(req, res, next) {
    Sinh_vien.findByIdAndUpdate(req.body.id, req.body, (error, data) => {
        res.redirect("/");
    });
});

router.get("/form-delete/:id", function(req, res, next) {
    Sinh_vien.findByIdAndDelete(req.params.id, (error, data) => {
        res.redirect("/");
    });
});

module.exports = router;