export default function formatDate(props: { date: Date }): string {
  const formatter = new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  })
  const formatted = formatter.format(props.date);
  return formatted;
}