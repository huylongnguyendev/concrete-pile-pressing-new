import { useSuspenseQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { EllipsisVerticalIcon } from "lucide-react";
import { Avatar, AvatarImage } from "#/components/ui/avatar";
import { Button } from "#/components/ui/button";
import { CardContent } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { userQuery } from "#/db/query/user.query";
import { cn } from "#/lib/utils";

export function UserInfo() {
	const { data, isPending } = useSuspenseQuery(userQuery);

	return (
		<CardContent className="space-y-4">
			<div className="flex justify-between">
				<div className="flex items-center gap-4">
					<Avatar size="lg">
						<AvatarImage
							src="https://api.dicebear.com/10.x/adventurer-neutral/svg?seed=1xx5hf8t"
							alt="avatar"
						/>
					</Avatar>
					<div className="font-semibold">
						{isPending ? (
							<>
								<Skeleton className="w-10 h-4" />
								<Skeleton className="w-6 h-2" />
							</>
						) : (
							<>
								<h2 className="text-lg">{data?.user?.fullName}</h2>
								<p className="text-sm text-muted-foreground">
									@{data?.user?.username}
								</p>
							</>
						)}
					</div>
				</div>
				<Button variant={"outline"} asChild className="max-md:hidden">
					<Link
						to="/admin/$userId/edit"
						params={{ userId: data?.user?.id || "" }}
					>
						Sửa thông tin
					</Link>
				</Button>
				<Tooltip>
					<TooltipTrigger asChild>
						<Button
							variant={"outline"}
							size={"icon"}
							asChild
							className="md:hidden"
						>
							<Link
								to="/admin/$userId/edit"
								params={{ userId: data?.user?.id || "" }}
							>
								<EllipsisVerticalIcon />
							</Link>
						</Button>
					</TooltipTrigger>
					<TooltipContent>Sửa thông tin</TooltipContent>
				</Tooltip>
			</div>
			<div className="space-y-2 font-semibold">
				<p className={cn(!data?.user?.phoneNumber && "text-muted-foreground")}>
					<span>Số điện thoại:</span>{" "}
					{isPending ? (
						<Skeleton className="h-4 w-10" />
					) : (
						data?.user?.phoneNumber || <em>Chưa có số điện thoại</em>
					)}
				</p>
				<p className={cn(!data?.user?.email && "text-muted-foreground")}>
					<span>Email:</span>{" "}
					{isPending ? (
						<Skeleton className="h-4 w-10" />
					) : (
						data?.user?.email || <em>Chưa có địa chỉ email</em>
					)}
				</p>
			</div>
		</CardContent>
	);
}
