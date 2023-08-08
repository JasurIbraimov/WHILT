import Feed from "@components/Feed";

const Home = () => {
    return (
        <section className="w-full flex-center flex-col">
            <h1 className="head_text text-center">
                Share & Explore
                <br className="max-md:hidden" />
                <span className="purple_gradient text-center"> knowledge!</span>
            </h1>
            <p className="desc text-center">
                <span className="purple_gradient font-bold">WHILT</span> is an
                open-source tool where you can share your daily knowledge and
                discover others.
            </p>

            <Feed />
        </section>
    );
};

export default Home;
