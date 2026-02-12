import ShopCart from "@/components/homePage/shopCart";
import { shopService } from "@/service/shop.service";
import { Category } from "@/shop";
import Link from "next/link";

interface Props {
  searchParams: Promise<{
    categoryId?: string;
    search?: string;
  }>;
}

export default async function ShopPage({ searchParams }: Props) {
  const params = await searchParams;

  const medicines = await shopService.getMedicines({
    categoryId: params.categoryId,
    search: params.search,
  });

  const categories = (await shopService.getCategories()) || []; // create this

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid md:grid-cols-4 gap-8">
        {/* LEFT SIDEBAR */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold">Categories</h2>

          <Link
            href="/shop"
            className={`block p-2 rounded hover:bg-gray-100 ${
              !params.categoryId && "bg-gray-200"
            }`}
          >
            All
          </Link>

          {categories.map((cat: Category) => (
            <Link
              key={cat.id}
              href={`/shop?categoryId=${cat.id}`}
              className={`block p-2 rounded hover:bg-gray-100 ${
                params.categoryId === cat.id && "bg-gray-200"
              }`}
            >
              {cat.name}
            </Link>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="md:col-span-3 space-y-6">
          {/* SEARCH */}
          <form className="flex gap-2">
            <input
              type="text"
              name="search"
              placeholder="Search medicine..."
              defaultValue={params.search}
              className="border rounded-lg px-4 py-2 w-full"
            />
            <button
              type="submit"
              className="bg-primary text-white px-6 rounded-lg"
            >
              Search
            </button>
          </form>

          {/* PRODUCTS GRID */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {medicines.length > 0 ? (
              medicines.map((medicine) => (
                <ShopCart key={medicine.id} medicine={medicine} />
              ))
            ) : (
              <p>No medicines found</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
