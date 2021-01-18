function useSearch({
  query,
  callBack,
}) {
  const [value, setValue] = useState([]);
  const [loading, setLoading] = useState(false);

  const onSearch = useCallback(
    async () => {
      setLoading(true);
      const data= await query();
      setValue(data);
      callBack(data);
      setLoading(false);
    },
    [query, payload],
  );
  return { feData: value, loading, onSearch };
}