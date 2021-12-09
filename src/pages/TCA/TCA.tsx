import { useGetToken } from "contexts/AuthProvider";
import { Redirect } from "react-router-dom";
import { app, site } from "types/routes";
import Donater from "components/Donater/Donater";
import DonateSuite from "components/TransactionSuite/DonateSuite";
import DappHead from "components/Headers/DappHead";

export default function TCA() {
  const decodedToken = useGetToken();

  //user can't access TCA page when not logged in or his prev token expired
  if (!decodedToken?.token) {
    return <Redirect to={`${site.app}/${app.login}`} />;
  }

  return (
    <div className="grid grid-rows-a1 place-items-center min-h-screen pt-2 pb-16">
      <DappHead />
      <Donater to="tca">
        <DonateSuite />
      </Donater>
    </div>
  );
}
