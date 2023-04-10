const SubHeader = ({ name, slogan, avatar, cover, author }) => {
  return (
    <section className="bg-neutral-800 pt-12">
      <div className="h-20">
        <img src={cover} className="h-full w-full object-cover" alt="" />
      </div>
      <div className="flex mx-auto max-w-7xl">
        <img
          src={avatar}
          alt=""
          className="relative h-20 w-20 -top-3 bg-white rounded-full overflow-hidden mx-6 border-[4px] border-transparent object-cover"
        />
        <div className="pt-2 pl-4">
          <h1 className="text-3xl text-neutral-200">{slogan}</h1>
          <h5 className="text-neutral-500">r/{name}</h5>
        </div>
      </div>
    </section>
  );
};
export default SubHeader;
