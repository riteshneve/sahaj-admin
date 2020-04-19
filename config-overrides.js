const path = require("path");
const {
	override,
	fixBabelImports,
	addWebpackAlias,
	addLessLoader
} = require("customize-cra");

//https://ant.design/docs/react/use-with-create-react-app
module.exports = override(
	fixBabelImports("import", {
		libraryName: "antd",
		libraryDirectory: "es",
		style: "css"
	}),
	//https://github.com/arackaf/customize-cra
	addWebpackAlias({
		react: path.resolve(__dirname, "node_modules/react")
	}),
	addWebpackAlias({
		"styled-components": path.resolve(
			__dirname,
			"node_modules/styled-components"
		)
	}),
	addWebpackAlias({
		"@": path.resolve(__dirname, "src")
	}),
	addLessLoader({
		strictMath: false,
		noIeCompat: true,
		sourceMap: {
			sourceMapFileInline: true
		},
		javascriptEnabled: true
		// localIdentName: "[local]--[hash:base64:5]" // if you use CSS Modules, and custom `localIdentName`, default is '[local]--[hash:base64:5]'.
	})
);
