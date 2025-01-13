import { buttonVariants } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return <>
  <h1 className='text-4xl'>Home</h1>
  <Link href='/admin' className={buttonVariants()}>My Admin</Link>
  </>
}
