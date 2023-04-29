import { PropsWithChildren } from "react";
import { Link } from "react-router-dom";
import { FormValues as FV } from "./types";
import { UNSDG_NUMS } from "types/lists";
import ActivityCountries from "components/ActivityCountries";
import CountrySelector from "components/CountrySelector";
import Icon from "components/Icon";
import ImgEditor from "components/ImgEditor";
import { RichTextEditor } from "components/RichText";
import { Selector } from "components/Selector";
import Toggle from "components/Toggle";
import { Field, Label } from "components/form";
import { ENDOW_DESIGNATIONS } from "constants/common";
import { appRoutes } from "constants/routes";
import { unsdgs } from "constants/unsdgs";
import { getSDGLabelValuePair } from "./getSDGLabelValuePair";
import { MAX_SIZE_IN_BYTES, VALID_MIME_TYPES } from "./schema";
import useEditProfile from "./useEditProfile";

const sdgOptions = Object.entries(unsdgs).map(([key, { title }]) =>
  getSDGLabelValuePair(key, title)
);

export default function Form() {
  const { editProfile, isSubmitting, id, reset } = useEditProfile();

  return (
    <form
      onSubmit={editProfile}
      onReset={(e) => {
        e.preventDefault();
        reset();
      }}
      className="w-full max-w-4xl justify-self-center grid content-start gap-6 mt-6 font-body"
    >
      <Link
        to={`${appRoutes.profile}/${id}`}
        className="text-blue hover:text-orange text-sm flex items-center gap-1"
      >
        <Icon type="Back" />
        <span>Back to profile</span>
      </Link>
      <Toggle<FV> name="published" classes={{ container: "ml-auto text-sm" }}>
        Publish profile
      </Toggle>
      <Group
        title="Public profile information"
        description="The following information will be used to populate your public
          profile."
      >
        <Field<FV>
          classes="field-admin"
          name="name"
          label="Name of your organization"
          required
        />
        <Field<FV>
          classes="field-admin"
          name="tagline"
          label="Tagline of your organization"
          required
        />
        <Field<FV>
          classes="field-admin"
          name="registration_number"
          label="Organization’s registration number"
        />
        <Label className="-mb-4" required>
          Banner image of your organization
        </Label>
        <ImgEditor<FV, "image">
          name="image"
          accept={VALID_MIME_TYPES}
          aspect={[4, 1]}
          classes={{ container: "mb-4", dropzone: "w-full aspect-[4/1]" }}
        />
        <Label className="-mb-4" required>
          Logo of your organization
        </Label>
        <ImgEditor<FV, "logo">
          name="logo"
          accept={VALID_MIME_TYPES}
          aspect={[1, 1]}
          classes={{
            container: "mb-4",
            dropzone: "w-28 sm:w-48 aspect-square",
          }}
          maxSize={MAX_SIZE_IN_BYTES}
        />
        <Label className="-mb-4" required>
          Description of your organization
        </Label>
        <RichTextEditor<FV>
          fieldName="overview"
          placeHolder="A short overview of your charity"
          charLimit={4000}
          classes={{
            container:
              "rich-text-toolbar border border-prim text-sm grid grid-rows-[auto_1fr] rounded bg-orange-l6 dark:bg-blue-d7 p-3 min-h-[15rem]",
            error: "static field-error -mt-4",
            charCounter: "text-gray-d1 dark:text-gray",
          }}
        />
        <Field<FV>
          classes="field-admin"
          name="url"
          label="Website of your organization"
          placeholder="https://website.org"
        />
      </Group>

      <Group title="Organization">
        <Label className="-mb-4" required>
          Aligned SDG#
        </Label>
        <Selector<FV, "categories_sdgs", UNSDG_NUMS, true>
          multiple
          name="categories_sdgs"
          options={sdgOptions}
          classes={{ button: "field-input-admin" }}
        />
        <Label className="-mb-4" required>
          Endowment Designation
        </Label>
        <Selector<FV, "endow_designation", string, false>
          name="endow_designation"
          options={ENDOW_DESIGNATIONS.map((option) => ({
            label: option.label,
            value: option.value,
          }))}
          classes={{ button: "field-input-admin" }}
        />
        <Label className="-mb-4" required>
          Headquarters
        </Label>
        <CountrySelector<FV, "hq_country">
          placeholder="Select a country"
          fieldName="hq_country"
          classes={{
            container: "px-4 bg-orange-l6 dark:bg-blue-d7",
            input: "text-sm py-3.5",
            error: "field-error",
          }}
        />
        <Label className="-mb-4">Active countries</Label>
        <ActivityCountries<FV, "active_in_countries">
          name="active_in_countries"
          classes={{
            button: "field-input-admin",
          }}
        />
        <Field<FV>
          classes="field-admin"
          name="street_address"
          label="Address"
        />
      </Group>

      <Group title="Social Media">
        <Field<FV>
          classes="field-admin"
          name="social_media_url_facebook"
          label="Facebook"
          placeholder="https://facebook.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_url_linkedin"
          label="Linkedin"
          placeholder="https://linkedin.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_url_twitter"
          label="Twitter"
          placeholder="https://twitter.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_url_discord"
          label="Discord"
          placeholder="https://discord.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_url_instagram"
          label="Instagram"
          placeholder="https://instagram.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_url_youtube"
          label="YouTube"
          placeholder="https://youtube.com/"
        />
        <Field<FV>
          classes="field-admin"
          name="social_media_url_tiktok"
          label="Tiktok"
          placeholder="https://tiktok.com/"
        />
      </Group>

      <div className="flex gap-3">
        <button
          disabled={isSubmitting}
          type="reset"
          className="px-6 btn-outline-filled text-sm"
        >
          Reset changes
        </button>
        <button
          disabled={isSubmitting}
          type="submit"
          className="px-6 btn-orange text-sm"
        >
          Submit changes
        </button>
      </div>
    </form>
  );
}

function Group({
  description,
  ...props
}: PropsWithChildren<{
  title: string;
  description?: string;
}>) {
  return (
    <div className="grid gap-6 p-6 border border-prim rounded">
      <h3 className="text-2xl font-body">{props.title}</h3>
      {description && (
        <p className="-mt-4 text-lg font-semibold">{description}</p>
      )}
      {props.children}
    </div>
  );
}
