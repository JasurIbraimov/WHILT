import Image from "next/image";

const Error = ({message}) => {
    return (
        <div className="flex justify-center items-center my-5 flex-col">
            <Image
                src={"/assets/images/error.png"}
                alt="Error"
                width={200}
                height={200}
            />
            <p className="text-2xl font-bold mt-3">{message}</p>
        </div>
    );
};

export default Error;
