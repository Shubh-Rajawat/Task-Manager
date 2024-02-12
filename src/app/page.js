import AddButton from "@/components/AddButton";
import TodoList from "@/components/TodoList";

export default function Home() {
  return (
    <main className=" h-screen mx-auto bg-[#0f1318] overflow-hidden ">
      {/* header start */ }
      <div className="z-10 mx-auto mt-16  w-full items-center justify-around font-mono text-sm flex ">
        <p className="flex  justify-center border-b     border-neutral-800 from-inherit static w-auto  rounded-xl border p-4 bg-white ">
          <code className="text-[16px] text-black font-extrabold ">Have|To|Do</code>
        </p>
        <div className="flex   items-end justify-center   from-black via-black static h-auto w-auto bg-none">
          <AddButton />
        </div>
      </div>
      {/* header end */ }
      <TodoList />
    </main>
  );
}


{/* <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-full sm:before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full sm:after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px] z-[-1]">
</div> */}