import { gql, useMutation } from "@apollo/client";
import { SHA256 } from "crypto-js";
import { FC, useContext, useState, Dispatch, SetStateAction } from "react";
import { UserContext } from "./UserContext";

interface CreatePostModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    refetchAction: any;
}

const CREATE_POST = gql`
    mutation CreatePost(
        $postId: String!
        $content: String!
        $userId: String!
        $hashTagString: String!
    ) {
        createPost(
            postId: $postId
            content: $content
            userId: $userId
            hashTagString: $hashTagString
        ) {
            id
        }
    }
`;

const CreatePostModal: FC<CreatePostModalProps> = (props) => {
    const [body, setBody] = useState<string>("");
    const [hashTags, setHashTags] = useState<string>("");
    const { user, setUser } = useContext(UserContext);
    const [createPost] = useMutation(CREATE_POST);

    const handleBodyInput = (event) => setBody(event.target.value);
    const handleHashTagsInput = (event) => setHashTags(event.target.value);

    const handleSubmit = (event) => {
        event.preventDefault();

        createPost({
            variables: {
                postId: SHA256(body).toString(),
                content: body,
                userId: user.id,
                hashTagString: hashTags,
            },
        }).then(() => props.refetchAction());

        setBody("");
        setHashTags("");

        props.setShowModal(false);
    };

    const handleReset = (event) => {
        event.preventDefault();

        setBody("");
        setHashTags("");

        props.setShowModal(false);
    };

    return (
        <form
            className="fixed p-4 bg-gradient-to-r from-purple-700 to-purple-500 w-4/5 md:w-1/3 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-md"
            onSubmit={handleSubmit}
            onReset={handleReset}
        >
            <h1 className="font-serif text-white text-2xl underline mb-2 text-center">
                Create a New Post
            </h1>
            <label
                htmlFor="body-input"
                className="font-serif mb-2 text-lg text-gray-200"
            >
                Body:
            </label>
            <textarea
                id="body-input"
                className="w-full bg-gray-100 font-mono text-lg rounded p-2 shadow-inner mb-2"
                required={true}
                maxLength={300}
                placeholder="Enter the Body for your New Post"
                value={body}
                onChange={handleBodyInput}
                spellCheck={false}
                rows={3}
            ></textarea>
            <label
                htmlFor="hashtags-input"
                className="font-serif mb-2 text-lg text-gray-200"
            >
                HashTags:
            </label>
            <input
                type="text"
                id="hashtags-input"
                className="w-full bg-gray-100 font-mono text-lg rounded p-2 shadow-inner"
                placeholder="Comma seperated HashTags"
                required={true}
                maxLength={100}
                value={hashTags}
                onChange={handleHashTagsInput}
                spellCheck={false}
            />
            <div className="flex justify-evenly mt-4 font-serif">
                <button
                    className="bg-white px-6 py-2 rounded shadow-md uppercase"
                    type="submit"
                >
                    Submit
                </button>
                <button
                    className="bg-red-600 text-white px-6 py-2 rounded shadow-md uppercase"
                    type="reset"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default CreatePostModal;
