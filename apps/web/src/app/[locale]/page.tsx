import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

type Props = {
  params: { locale: string };
};

export default function Index({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  const t = useTranslations("example");

  return (
    <>
      <p>{t("hello")}</p>
    </>
  );
}
