const Koa = require("koa");
const Router = require("koa-router");
const koaBody = require('koa-body');

const app = new Koa();
const router = new Router();

require("./mongo")(app);
const ObjectID = require("mongodb").ObjectID;

// Use the bodyparser middlware
app.use(koaBody());

router.post("/", async function (ctx) {
    let name = ctx.request.body.name || "World";
    ctx.body = {message: `Hello ${name}!`}
});

// List all people
router.get("/customerdb", async (ctx) => {
    ctx.body = await ctx.app.customerdb.find().toArray();
});

// Create new person
router.post("/customerdb", async (ctx) => {
    ctx.body = await ctx.app.customerdb.insert(ctx.request.body);
});



// Get one
router.get("/customerdb/:id", async (ctx) => {
    ctx.body = await ctx.app.customerdb.findOne({"_id": ObjectID(ctx.params.id)});
});

// Update one
router.put("/customerdb/:id", async (ctx) => {
    let documentQuery = {"_id": ObjectID(ctx.params.id)}; // Used to find the document
    let valuesToUpdate = ctx.request.body;
    ctx.body = await ctx.app.customerdb.updateOne(documentQuery, valuesToUpdate);
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(3000);
