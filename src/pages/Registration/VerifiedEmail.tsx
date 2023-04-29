import jwtDecode from "jwt-decode";
import { PropsWithChildren } from "react";
import { Location, Navigate, useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import { InitReg } from "./types";
import { InitApplication } from "types/aws";
import { useRequestEmailMutation } from "services/aws/registration";
import { useErrorContext } from "contexts/ErrorContext";
import { useModalContext } from "contexts/ModalContext";
import Icon from "components/Icon";
import Popup from "components/Popup";
import { handleMutationResult, logger } from "helpers";
import { APP_NAME } from "constants/common";
import { appRoutes } from "constants/routes";
import routes, { steps } from "./routes";

type JwtData = InitApplication & {
  authorization: string;
  exp: number;
  iat: number;
  user: string;
};

export default function VerifiedEmail({ classes = "" }: { classes?: string }) {
  const location = useLocation();
  const { handleError } = useErrorContext();
  const [requestEmail, { isLoading }] = useRequestEmailMutation();
  const { showModal } = useModalContext();

  const data = extractJwtData(location);
  if (!data) {
    /** if JWT data is tampered in URL */
    return <Navigate to={".."} />;
  }

  const {
    application: { ContactPerson: c },
    isExpired,
  } = data;

  if (isExpired) {
    return (
      <Container classes={classes}>
        <Icon type="Info" className="text-red" size={80} />
        <Text classes="mt-4 mb-8">
          Your verification link has expired. Please resend the verification
          email.
        </Text>
        <button
          className="btn-orange btn-reg w-64 h-12 "
          onClick={async () => {
            handleMutationResult(
              await requestEmail({ uuid: c.PK, email: c.Email }),
              handleError,
              () => {
                showModal(Popup, { message: "Email verification sent!" });
              }
            );
          }}
          disabled={isLoading}
        >
          Resend verification email
        </button>
      </Container>
    );
  }

  const state: InitReg = {
    reference: c.PK,
    email: c.Email,
    isEmailVerified: true,
    lastVerified: c.EmailVerificationLastSentDate,
  };

  return (
    <Container classes={classes}>
      <Icon type="CheckCircle" className="text-green" size={80} />
      <h1 className="text-[2rem] mt-10 text-center">
        Your email address is confirmed!
      </h1>
      <Text classes="mb-8 mt-2">
        {`Thank you for your interest in ${APP_NAME}! Your endowment is just a
        few steps away.`}
      </Text>
      <Link
        className="w-full max-w-[26.25rem] btn-orange btn-reg"
        to={`${appRoutes.register}/${routes.steps}/${steps.contact}`}
        state={state}
      >
        Continue Registration
      </Link>
    </Container>
  );
}

function Container({
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <div className={`${classes} grid justify-items-center`}>{children}</div>
  );
}

function Text({
  children,
  classes = "",
}: PropsWithChildren<{ classes?: string }>) {
  return (
    <p
      className={`text-center text-gray-d1 dark:text-white/75 w-full text-lg max-w-lg ${classes}`}
    >
      {children}
    </p>
  );
}

function extractJwtData(
  location: Location
): { application: InitApplication; isExpired: boolean } | undefined {
  try {
    const pathNames = location.pathname.split("/");
    const jwtToken = pathNames[pathNames.length - 1];
    const jwtData = jwtDecode<JwtData>(jwtToken);
    const { authorization, exp, iat, user, ...application } = jwtData;
    const isExpired = Math.floor(Date.now() / 1000) >= exp;
    return { application, isExpired };
  } catch (err) {
    logger.error(err);
    return undefined;
  }
}
