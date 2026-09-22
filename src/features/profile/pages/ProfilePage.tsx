import React, { useState } from "react";
import {
  ShieldAlert,
  Phone,
  User,
  Heart,
  Scale,
  Flame,
  Droplets,
  AlertTriangle,
  Save,
  CheckCircle2,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select } from "@/components/ui/select";
import { useAuthStore } from "@/stores/useAuthStore";

export const ProfilePage: React.FC = () => {
  const { user, updateUser } = useAuthStore();
  const [isSaved, setIsSaved] = useState(false);

  const [formData, setFormData] = useState({
    fullName: user?.fullName || "",
    email: user?.email || "",
    age: user?.age || 32,
    gender: user?.gender || "male",
    bloodType: user?.bloodType || "O+",
    heightCm: user?.heightCm || 175,
    currentWeightKg: user?.currentWeightKg || 68.5,
    targetWeightKg: user?.targetWeightKg || 65.0,
    targetDailyCalories: user?.targetDailyCalories || 2100,
    targetDailyWaterMl: user?.targetDailyWaterMl || 2500,
    emergencyName: user?.emergencyContact.name || "",
    emergencyPhone: user?.emergencyContact.phoneNumber || "",
    emergencyRel: user?.emergencyContact.relationship || "",
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    updateUser({
      fullName: formData.fullName,
      email: formData.email,
      age: Number(formData.age),
      gender: formData.gender as "male" | "female" | "other",
      bloodType: formData.bloodType as "A+" | "O+" | "B+" | "AB+",
      heightCm: Number(formData.heightCm),
      currentWeightKg: Number(formData.currentWeightKg),
      targetWeightKg: Number(formData.targetWeightKg),
      targetDailyCalories: Number(formData.targetDailyCalories),
      targetDailyWaterMl: Number(formData.targetDailyWaterMl),
      emergencyContact: {
        name: formData.emergencyName,
        phoneNumber: formData.emergencyPhone,
        relationship: formData.emergencyRel,
      },
    });
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 2000);
  };

  return (
    <div className="space-y-8 pb-8">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-black text-foreground tracking-tight flex items-center gap-2">
          <ShieldAlert className="h-6 w-6 text-red-500" />
          Hồ Sơ Y Tế & Thẻ Cấp Cứu Khẩn Cấp
        </h1>
        <p className="text-xs sm:text-sm text-muted-foreground">
          Thông tin y tế sống còn (Medical ID), dị ứng thuốc, nhóm máu và người liên hệ khi cấp cứu.
        </p>
      </div>

      {/* Emergency Medical ID Card (Top Highlight) */}
      <Card className="border-red-500/40 bg-gradient-to-br from-red-500/10 via-card to-card relative overflow-hidden">
        <div className="absolute -right-8 -bottom-8 opacity-5 text-red-500 pointer-events-none">
          <ShieldAlert className="h-64 w-64" />
        </div>

        <CardHeader className="p-6 pb-3">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <img
                src={user?.avatarUrl}
                alt={user?.fullName}
                className="h-14 w-14 rounded-2xl object-cover ring-2 ring-red-500/40 shadow-sm"
              />
              <div>
                <CardTitle className="text-lg font-black text-foreground flex items-center gap-2">
                  {user?.fullName}
                  <Badge variant="critical">MEDICAL ID</Badge>
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {user?.age} tuổi • {user?.gender === "male" ? "Nam" : "Nữ"} • Cao {user?.heightCm}cm
                </p>
              </div>
            </div>

            {/* Blood Type Badge */}
            <div className="flex items-center gap-2 bg-red-500/15 border border-red-500/30 px-4 py-2 rounded-2xl text-red-600 dark:text-red-400 font-extrabold text-sm shadow-xs">
              <Heart className="h-4 w-4 fill-current" />
              Nhóm Máu: {user?.bloodType}
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-6 pt-2 space-y-4">
          {/* Allergies & Conditions Warning */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3.5 rounded-xl border border-red-500/30 bg-red-500/5 space-y-1.5">
              <span className="text-xs font-bold text-red-600 dark:text-red-400 flex items-center gap-1.5">
                <AlertTriangle className="h-4 w-4" />
                Dị Ứng Thuốc & Thức Ăn:
              </span>
              <div className="flex flex-wrap gap-1.5">
                {user?.allergies.map((all, idx) => (
                  <Badge key={idx} variant="critical" className="text-xs">
                    {all}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Emergency Contact */}
            <div className="p-3.5 rounded-xl border border-border bg-muted/40 space-y-1.5">
              <span className="text-xs font-bold text-foreground flex items-center gap-1.5">
                <Phone className="h-4 w-4 text-emerald-500" />
                Người Liên Hệ Khẩn Cấp:
              </span>
              <p className="text-xs font-bold text-foreground">
                {user?.emergencyContact.name} ({user?.emergencyContact.relationship})
              </p>
              <a
                href={`tel:${user?.emergencyContact.phoneNumber}`}
                className="inline-flex items-center gap-1 text-xs font-bold text-teal-600 dark:text-teal-400 hover:underline"
              >
                <Phone className="h-3 w-3" />
                {user?.emergencyContact.phoneNumber}
              </a>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Target Goals & Medical Profile Setting Form */}
      <form onSubmit={handleSave} className="space-y-6">
        <Card>
          <CardHeader className="p-5 pb-3">
            <CardTitle className="text-base font-bold">Cài Đặt Mục Tiêu Thể Chất & Sức Khỏe</CardTitle>
            <p className="text-xs text-muted-foreground">
              Thiết lập chỉ tiêu calo, cân nặng và lượng nước cần uống mỗi ngày.
            </p>
          </CardHeader>
          <CardContent className="p-5 pt-0 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <Input
                label="Cân nặng mục tiêu (kg)"
                type="number"
                step="0.1"
                value={formData.targetWeightKg}
                onChange={(e) => setFormData({ ...formData, targetWeightKg: Number(e.targetWeightKg || e.target.value) })}
                startIcon={<Scale className="h-4 w-4 text-sky-500" />}
              />
              <Input
                label="Calo mục tiêu mỗi ngày (kcal)"
                type="number"
                value={formData.targetDailyCalories}
                onChange={(e) => setFormData({ ...formData, targetDailyCalories: Number(e.target.value) })}
                startIcon={<Flame className="h-4 w-4 text-amber-500" />}
              />
              <Input
                label="Nước uống mục tiêu (ml)"
                type="number"
                value={formData.targetDailyWaterMl}
                onChange={(e) => setFormData({ ...formData, targetDailyWaterMl: Number(e.target.value) })}
                startIcon={<Droplets className="h-4 w-4 text-teal-500" />}
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <Input
                label="Họ và tên người dùng"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              />
              <Input
                label="Email liên hệ"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              />
              <Select
                label="Nhóm máu"
                value={formData.bloodType}
                onChange={(e) => setFormData({ ...formData, bloodType: e.target.value })}
                options={[
                  { label: "Nhóm O+", value: "O+" },
                  { label: "Nhóm A+", value: "A+" },
                  { label: "Nhóm B+", value: "B+" },
                  { label: "Nhóm AB+", value: "AB+" },
                  { label: "Nhóm O-", value: "O-" },
                ]}
              />
            </div>

            <div className="flex justify-end pt-3">
              <Button type="submit" className="gap-1.5 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-xl">
                {isSaved ? <CheckCircle2 className="h-4 w-4" /> : <Save className="h-4 w-4" />}
                {isSaved ? "Đã Cập Nhật Hồ Sơ!" : "Lưu Thay Đổi"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
};
