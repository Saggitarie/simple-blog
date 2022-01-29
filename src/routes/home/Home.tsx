import Blog from "@components/blog/BlogElement";

const Home: React.FC = () => {
	return (
		<div className="container center space-items-medium">
			<h1>Simple Blog Post Page</h1>
			<span>test</span>
			<span>test</span>
			<span>test</span>
			<span>test</span>
			<Blog />
		</div>
	);
};

export default Home;
