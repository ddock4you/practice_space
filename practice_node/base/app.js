const express = require("express");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const multer = require("multer");
const dotenv = require("dotenv");
const path = require("path");
const nunjucks = require("nunjucks");
const fs = require("fs");

try {
	fs.readdirSync("uploads");
} catch (err) {
	console.error("uploads 폴더가 없어서 uploads 폴더를 생성합니다.");
	fs.mkdirSync("uploads");
}

dotenv.config();
const router = express.Router();
const indexRouter = require("./routes");
const userRouter = require("./routes/user");
const app = express();
const upload = multer({
	storage: multer.diskStorage({
		// req: 요청에 대한 정보
		// file: 업로드한 파일에 대한 정보
		// done: 함수 [ done(err, 실제경로, 파일이름) ]
		// 어디에 넣을지
		destination(req, file, done) {
			done(null, "uploads/");
		},
		// 어떤 이름으로 저장할지
		filename(req, file, done) {
			const ext = path.extname(file.originalname);
			console.log({
				ext,
			});
			console.log({
				originalname: file.originalname,
			});
			done(null, path.basename(file.originalname, ext) + Date.now() + ext);
		},
	}),
	limits: {
		fileSize: 5 * 1024 * 1024,
	},
});

// pug setting
// app.set("views", path.join(__dirname, "views"));
// app.set("view engine", "pug");
app.set('view engine', 'html');
nunjucks.configure("views", {
	express: app,
	watch: true,
});
app.set("port", process.env.PORT || 3001);
app.use(morgan("dev"));
app.use("/", express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(
	express.urlencoded({
		extended: false,
	})
);
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
	session({
		resave: false,
		saveUninitialized: false,
		secret: process.env.COOKIE_SECRET,
		cookie: {
			httpOnly: true,
			secure: false,
		},
		name: "session-cookie",
	})
);

// router
app.use("/", indexRouter);
app.use("/user", userRouter);
app.use((req, res, next) => {
	res.status(404).render("error", {
		message: "error",
		error: {
			status: res.statusCode,
			stack: "stack",
		},
	});
	console.log(res);
});

router.get("/upload", (req, res) => {
	res.sendFile(path.join(__dirname, "/multipart.html"));
});
router.post(
	"/upload",
	upload.fields([{
			name: "image1",
		},
		{
			name: "image2",
		},
	]),
	(req, res) => {
		console.log(req.files, req.body);
		res.send("ok");
	}
);

// server on
app.listen(app.get("port"), () => {
	console.log(app.get("port"), "번 포트에서 대기 중");
});