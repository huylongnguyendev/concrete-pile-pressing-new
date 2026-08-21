import { Building2Icon, ShieldCheckIcon } from "lucide-react";
import { FooterWithData } from "./FooterWithData";

export function Footer() {
	return (
		<footer className="bg-zinc-900 text-zinc-300 border-t border-zinc-800">
			<div className="box py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
				{/* Cột 1: Thông tin công ty */}
				<div className="space-y-4">
					<div className="flex items-center gap-2 text-white">
						<div className="p-2 bg-primary text-white rounded-xl">
							<Building2Icon className="w-5 h-5" />
						</div>
						<span className="font-bold text-lg tracking-tight">
							Ép Cọc Bê Tông Hùng Dũng
						</span>
					</div>
					<p className="text-sm text-zinc-400 leading-relaxed font-medium">
						Chuyên gia hàng đầu trong lĩnh vực ép cọc tải, ép cọc neo và cung
						cấp cọc bê tông cốt thép vững chắc cho mọi công trình tại Đồng Nai &
						Bà Rịa - Vũng Tàu.
					</p>
					<div className="flex items-center gap-2 text-xs text-primary font-semibold">
						<ShieldCheckIcon className="w-4 h-4" />
						<span>Cam kết chất lượng - Không lún nứt</span>
					</div>
				</div>

				{/* Cột 2: Dịch Vụ Cốt Lõi */}
				<div>
					<h3 className="text-white font-bold mb-4 tracking-wide uppercase text-xs">
						Giải Pháp Thi Công
					</h3>
					<ul className="space-y-2.5 text-sm text-zinc-400 font-medium">
						<li>
							<span className="hover:text-primary transition-colors cursor-pointer">
								Ép cọc tải sắt công trình lớn
							</span>
						</li>
						<li>
							<span className="hover:text-primary transition-colors cursor-pointer">
								Ép cọc neo nhà dân, hẻm nhỏ
							</span>
						</li>
						<li>
							<span className="hover:text-primary transition-colors cursor-pointer">
								Sản xuất cọc BTCT theo yêu cầu
							</span>
						</li>
						<li>
							<span className="hover:text-primary transition-colors cursor-pointer">
								Khảo sát địa chất & tư vấn móng
							</span>
						</li>
					</ul>
				</div>

				{/* Cột 3: Khu Vực Phục Vụ (Local SEO) */}
				<div>
					<h3 className="text-white font-bold mb-4 tracking-wide uppercase text-xs">
						Khu Vực Hoạt Động
					</h3>
					<ul className="space-y-2.5 text-sm text-zinc-400 font-medium">
						<li>TP. Biên Hòa, Đồng Nai</li>
						<li>Huyện Long Thành, Đồng Nai</li>
						<li>Huyện Nhơn Trạch, Đồng Nai</li>
						<li>TP. Vũng Tàu, BR - Vũng Tàu</li>
						<li>TP. Bà Rịa & Thị xã Phú Mỹ</li>
					</ul>
				</div>

				{/* Cột 4: Thông Tin Liên Hệ */}
				<div>
					<h3 className="text-white font-bold mb-4 tracking-wide uppercase text-xs">
						Liên Hệ Trực Tiếp
					</h3>

					<FooterWithData />
				</div>
			</div>

			{/* Dòng bản quyền dưới cùng */}
			<div className="box py-6 border-t border-zinc-800 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 gap-4">
				<p>
					&copy; {new Date().getFullYear()} Ép Cọc Miền Nam. Bảo lưu mọi quyền.
				</p>
				<div className="flex gap-6">
					<span className="hover:text-zinc-300 transition-colors cursor-pointer">
						Chính sách bảo mật
					</span>
					<span className="hover:text-zinc-300 transition-colors cursor-pointer">
						Điều khoản dịch vụ
					</span>
				</div>
			</div>
		</footer>
	);
}
