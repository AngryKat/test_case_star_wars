import Pagination from "@/components/Pagination";
import { PersonGrid } from "@/components/PersonGrid";
import { getPeople } from "@/utils/api";
import { Person } from "@/utils/types";
import styles from "./page.module.scss";
import { SearchInput } from "@/components/SearchInput";

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
    details?: string;
  } = await getPeople(page, searchTerm);

  const totalCount = fetchedData.count || 0;

  return (
    <div className={styles.wrapper}>
      <div className={styles.searchInputContainer}>
        <SearchInput />
      </div>
      <Pagination
        total={totalCount}
        currentPage={page}
        className={styles.pagination}
      />
      <div className={styles.gridContainer}>
        {fetchedData.results && <PersonGrid items={fetchedData.results} />}
      </div>
      <Pagination
        total={totalCount}
        currentPage={page}
        className={styles.pagination}
      />
    </div>
  );
}
