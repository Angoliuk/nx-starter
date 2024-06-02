import { Card } from "@/ui-shared/components/card";
import { PageWrapper } from "@/ui-shared/components/page-wrapper";
import { webContract } from "@/web-shared/api";
import { ClientInferRequest } from "@ts-rest/core";

import { api } from "../../../utils/api";
import { loggedInProtection } from "../../../utils/auth-protection";
import { SignUp } from "./sign-up";
export default async function Index() {
  await loggedInProtection();

  const handleSignUp = async (data: ClientInferRequest<typeof webContract.auth.signUp>["body"]) => {
    "use server";
    const response = await api.auth.signUp({ body: data });

    return response;
  };

  return (
    <PageWrapper contentWrapperClassName="items-center" isHeaderShown={false}>
      <Card className="mt-12 w-full max-w-[512px] px-6 py-4">
        <p className="text-headlineS mb-4 text-center">Registration</p>
        <SignUp handleSignUp={handleSignUp} />
      </Card>
    </PageWrapper>
  );
}
