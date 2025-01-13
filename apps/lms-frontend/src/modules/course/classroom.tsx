import classRoom from '../../assets/images/classroom.png';

export default function ClassRoom() {
  return (
    <div className="px-4 sm:px-6 md:px-12 font-poppins py-10 lg:ml-36">
      <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
        <div className="md:w-1/2 lg:pr-12 text-center md:text-left">
          <h2 className="text-xl md:text-2xl font-semibold leading-relaxed">
            Everything you can do in a physical classroom,{' '}
            <span className="text-custom-teal">
              you can do with SkillPrompt
            </span>
          </h2>
          <p className="text-gray-500 mt-4 text-sm md:text-base leading-relaxed">
            TOTC's school management software helps traditional and online
            schools manage scheduling, attendance, payments, and virtual
            classrooms, all in one secure cloud-based system.
          </p>
        </div>

        <div className="md:w-1/2 mt-8 md:mt-0 flex justify-center md:justify-end relative">
          <div className="absolute -top-6 -left-6 lg:ml-60 lg:-top-4  bg-custom-teal rounded-lg w-16 h-12 sm:w-20 sm:h-16 lg:w-36 lg:h-28 -z-10"></div>
          <div className="absolute -bottom-6 -right-6 lg:mr-32 bg-custom-teal rounded-lg w-20 h-16 sm:w-24 sm:h-20 lg:w-44 lg:h-36 -z-10"></div>

          <div className="h-48 w-72 sm:h-56 sm:w-80 md:h-60 md:w-96 lg:mr-32">
            <img
              src={classRoom}
              alt="Classroom"
              className="rounded-lg shadow-md object-cover w-full h-full"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
