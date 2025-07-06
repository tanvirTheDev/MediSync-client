import { Button, Container } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
type TSpecilistiesProps = {
  id: string;
  title: string;
  icon: string;
};
const Specialists = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_API}/api/v1/specialties`,
    {
      next: {
        revalidate: 30,
      },
    }
  );
  const { data: specialists } = await res.json();
  // console.log(specialists);

  return (
    <Container>
      <div className="my-10 py-10">
        <h1 className="text-4xl font-bold text-center">
          Explore Treatment Across Specialists
        </h1>
        <p className="text-gray-500 mt-3 text-center">
          Find experience doctors across all specialists
        </p>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-5 mt-10">
          {specialists?.slice(0, 6).map((specialist: TSpecilistiesProps) => (
            <div
              key={specialist.id}
              className="size-40 content-center justify-items-center bg-neutral-100 border border-neutral-100 rounded-lg hover:shadow-lg transition-shadow cursor-pointer"
            >
              <div className="flex justify-center">
                <Image
                  src={specialist.icon || "/default-Image"}
                  alt={specialist.title}
                  width={50}
                  height={50}
                />
              </div>
              <div className="font-bold mt-3 text-center text-sm">
                {specialist.title}
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-7">
          <Link href="/all-specialist">
            <Button variant="outlined">View All</Button>
          </Link>
        </div>
      </div>
    </Container>
  );
};

export default Specialists;
