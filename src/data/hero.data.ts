import { Building2Icon, CheckCircle2Icon, ShieldCheckIcon, UsersIcon } from "lucide-react";

interface QuickFeature {
  icon: React.ElementType; label: string
}

interface QuickStat {
  icon: React.ElementType;
  label: string;
  number: number;
  prefix: string;
}

const quickFeature: QuickFeature[] = [
  {
    icon: CheckCircle2Icon,
    label: "Khảo sát miễn phí",
  },
  { icon: CheckCircle2Icon, label: "Máy móc hiện đại" },
  { icon: CheckCircle2Icon, label: "Bảo hành dài hạn" },
];

const quickStat: QuickStat[] = [
  {
    icon: Building2Icon,
    number: 500,
    prefix: "+",
    label: "Công trình hoàn thành",
  },
  {
    icon: UsersIcon,
    number: 20,
    prefix: "+",
    label: "Năm kinh nghiệm",
  },
  {
    icon: ShieldCheckIcon,
    number: 100,
    prefix: "%",
    label: "Đạt chuẩn kỹ thuật",
  },
];

export {
  quickFeature, quickStat, type QuickFeature, type QuickStat
}