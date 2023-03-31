const SubHeader = () => {
  return (
    <section className="bg-neutral-800">
      <div className="h-20">
        <img
          src="/img/banner.jpg"
          className="h-full w-full object-cover"
          alt=""
        />
      </div>
      <div className="flex mx-auto max-w-7xl">
        <img
          src="/img/banana.jpg"
          alt=""
          className="relative h-20 w-20 -top-3 bg-white rounded-full overflow-hidden mx-6 border-[4px] border-transparent"
        />
        <div className="pt-2 pl-4">
          <h1 className="text-3xl text-neutral-200">
            Bananarama: rexxit for SWEs!
          </h1>
          <h5 className="text-neutral-500">r/bananarama</h5>
        </div>
      </div>
    </section>
  );
};
export default SubHeader;
