export default function getNameInitials(fullName: string | undefined): string {
  if (!fullName) return "";
  const names: string[] = fullName.split(" ");
  const count: number = names.length;
  if (count === 0) return "";
  if (count === 1) return names[0].charAt(0).toUpperCase();
  return (
    names[0].charAt(0).toUpperCase() + names[count - 1].charAt(0).toUpperCase()
  );
}
