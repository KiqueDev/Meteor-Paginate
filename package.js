Package.describe({
    summary: "A light weight meteor collection pagination."
});

Package.on_use(function (api) {
	api.use(['templating']);
	api.add_files(['paginate_pages.html', 'paginate.js'], 'client');
});