import { CustomPaginator } from "@/components/paginator";
import { useSubjectContext } from "../context/subject-context";

export const SubjectsPaginator = () => {
  const {
    subjectQueryResponse: data,
    subjectQuery,
    setSubjectQuery,
  } = useSubjectContext();
  return (
    <>
      {data && (
        <CustomPaginator
          currentPage={data.page}
          totalCount={data.totalCount}
          totalPages={data.totalPages}
          itemLabel="Subject/s"
          onPageClick={(page) => setSubjectQuery({ ...subjectQuery, page })}
        />
      )}
    </>
  );
};
