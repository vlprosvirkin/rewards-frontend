import tasks from '@/components/missions/dailyTasks.json';
import Image from 'next/image';
import A from '@/public/A.svg';

export default function GettingStarted() {
    return (
        <div className="flex flex-wrap text-white gap-[18px]">
            {tasks?.tasks &&
                tasks.tasks.map((item, index) => (
                    <div
                        key={`task_${index}`}
                        className="flex border border-white/[.1] rounded-[18px] pt-8 pb-6 px-6 backdrop-blur-2xl bg-white/[.05] w-1/2"
                    >
                        <div className="flex flex-col">
                            <p className="text-2xl mb-4">{item.name}</p>
                            <p className="text-[13px] text-white/[.58] mb-5">
                                {item.description}
                            </p>
                            <p className="text-[13px] font-bold">
                                {item.status}
                            </p>
                        </div>
                        <div className="ml-auto bg-white/[.07] rounded-[10px]">
                            <Image src={A} alt="" />
                        </div>
                    </div>
                ))}
        </div>
    );
}
