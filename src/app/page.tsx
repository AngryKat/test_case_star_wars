import { Pagination } from "@/components/Pagination/Pagination";
import { PersonGrid } from "@/components/PersonGrid/PersonGrid";
import { getPeople } from "@/utils/api";
import { Person } from "@/utils/types";
import styles from "./page.module.scss";
import { SearchInput } from "@/components/SearchInput/SearchInput";
import { NoPeopleToDisplay } from "@/components/NoPeopleToDisplay";
import { Suspense } from "react";
import Loading from "./loading";

export default async function Home({
  searchParams,
}: {
  searchParams?: {
    searchTerm?: string;
    page?: string;
  };
}) {
  // parse page param as number. Default to 1 if undefined
  const page = searchParams?.page ? +searchParams.page : 1;
  const searchTerm = searchParams?.searchTerm || "";

  const fetchedData: {
    count?: number;
    results?: Person[];
    error?: Error;
  } = await getPeople(page, searchTerm);

  if (fetchedData.error) {
    throw new Error(fetchedData.error.message);
  }

  const totalCount = fetchedData.count || 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchInputContainer}>
        <SearchInput />
      </div>
      <Suspense fallback={<Loading />}>
        {fetchedData.results?.length === 0 ? (
          <NoPeopleToDisplay />
        ) : (
          <div className={styles.content}>
            <Pagination
              total={totalCount}
              currentPage={page}
              className={styles.pagination}
            />
            <div className={styles.gridContainer}>
              {fetchedData.results && (
                <PersonGrid items={fetchedData.results} />
              )}
            </div>
            <Pagination
              total={totalCount}
              currentPage={page}
              className={styles.pagination}
            />
          </div>
        )}
      </Suspense>
    </div>
  );
}
