import { useMutation, useQueryClient } from "@tanstack/react-query";
import useOutsideClick from "../hooks/useOutsideClick";
import Button from "./Button";
import Input from "./Input";
import { useNavigate } from "react-router-dom";
import newRequest from "../utils/newRequest";
import { useState } from "react";

const CreateCommunity = ({ onClick }) => {
  const [name, setName] = useState("");
  const [slogan, setSlogan] = useState("");
  const [avatar, setAvatar] = useState("");
  const [cover, setCover] = useState("");

  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: (community) => newRequest.post("/community", community),
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries(["community"]);
      onClick();
      navigate(`/r/${data.name}`);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutation.mutate({ name, slogan, avatar, cover });
  };

  const ref = useOutsideClick(onClick);

  return (
    <div className="h-screen w-full bg-[rgba(0,0,0,.9)] fixed top-12 left-0 py-5 z-20 overflow-y-scroll">
      <div
        className="bg-neutral-900 text-neutral-300 p-6 w-3/4 md:w-1/2 rounded-md border mx-auto border-neutral-800"
        ref={ref}
      >
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <h1 className="text-2xl">Create a new community</h1>
          <Input
            name="name"
            type="text"
            className="rounded-md"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            name="slogan"
            type="text"
            className="rounded-md"
            placeholder="Slogan"
            value={slogan}
            onChange={(e) => setSlogan(e.target.value)}
          />
          <Input
            name="avatar"
            type="text"
            className="rounded-md"
            placeholder="Avatar image"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <Input
            name="cover"
            type="text"
            className="rounded-md"
            placeholder="Cover image"
            value={cover}
            onChange={(e) => setCover(e.target.value)}
          />
          <div className="flex gap-2 justify-end">
            <Button outline onClick={onClick}>
              Cancel
            </Button>
            <Button type="submit">CREATE</Button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default CreateCommunity;
