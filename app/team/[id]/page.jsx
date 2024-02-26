import Link from "next/link";
import { Metadata } from "next";
import Team from "@/app/components/team";

export const metadata = {
  title: "Team Details",
};

const Page = (params) => {
  return <Team params={params.params} />;
};

export default Page;
