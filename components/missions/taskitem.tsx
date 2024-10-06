import Image from "next/image";

interface Task {
	name: string;
	description?: string;
	category?: string;
	points: number;
}

interface Props {
	item: Task;
	showModal: (item: Task) => void;
}

const TaskItem: React.FC<Props> = ({ item, showModal }) => (
	<div
		onClick={() => showModal(item)}
		className="w-full flex flex-wrap border border-white/[.1] rounded-[18px] pt-8 pb-6 px-6 backdrop-blur-2xl bg-white/[.05]"
	>
		<div className="flex flex-col mr-5">
			<p className="text-2xl mb-4">{item.name}</p>
			<p className="text-[13px] text-white/[.58] mb-5">
				{item.description || "No description"}
			</p>
			<p className="text-[13px] font-bold">{item.category || "No category"}</p>
		</div>
		<div className="flex relative ml-auto bg-white/[.07] rounded-[10px]">
			<Image src="/path/to/image" alt="" className="" />
			<div className="absolute left-1/2 transform -translate-x-1/2 -bottom-4 py-1 px-3 bg-[#313824] rounded-[30px]">
				<p className="text-[#BCFE1E]">{item.points}</p>
			</div>
		</div>
	</div>
);

interface TaskListProps {
	category: string;
	tasks: Task[];
	sorted: Record<string, Task[]>;
	showModal: (item: Task) => void;
}

const TaskList: React.FC<TaskListProps> = ({
	category,
	tasks,
	sorted,
	showModal,
}) => {
	const categoryMap: Record<string, Task[]> = {
		all: tasks || [],
		getting_started: sorted?.["getting_started"] || [],
		daily_tasks: sorted?.["daily_task"] || [],
		social_challenges: sorted?.["social_challenges"] || [],
		ambassadors: sorted?.["ambassadors"] || [],
	};

	const taskList = categoryMap[category] || [];

	return (
		<>
			{taskList.map((item, index) => (
				<TaskItem key={`task_${index}`} item={item} showModal={showModal} />
			))}
		</>
	);
};

export default TaskList;
