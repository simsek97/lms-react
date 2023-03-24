const baseUrl =
	process.env.NODE_ENV === "production"
		? "https://edmy-react.hibootstrap.com"
		: "http://localhost:3000";

export default baseUrl;
