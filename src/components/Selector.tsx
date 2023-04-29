import { Listbox } from "@headlessui/react";
import { ErrorMessage } from "@hookform/error-message";
import { PropsWithChildren, ReactNode } from "react";
import {
  FieldValues,
  Path,
  useController,
  useFormContext,
} from "react-hook-form";
import Icon, { DrawerIcon } from "components/Icon";

type ValKey = string | number;

export type OptionType<V> = { label: string; value: V };
type Classes = {
  container?: string;
  button?: string;
};

type VarOption<M extends boolean, V extends ValKey> = M extends true
  ? OptionType<V>[]
  : OptionType<V>;

interface Props<
  T extends FieldValues,
  K extends Path<T>,
  V extends ValKey,
  M extends boolean
> {
  name: T[K] extends VarOption<M, V> ? K : never;
  multiple?: M;
  placeholder?: string;
  options: OptionType<V>[];
  disabled?: true;
  allSelectable?: M extends true ? boolean : never;
  classes?: Classes;
  children?: (selected: VarOption<M, V>) => ReactNode;
}

export const selectorButtonStyle = "flex items-center field-input";

const labelKey: keyof OptionType<string> = "label";

export function Selector<
  T extends FieldValues,
  K extends Path<T>,
  ValueType extends ValKey,
  Multiple extends boolean
>({
  name,
  disabled,
  options,
  children,
  classes,
  multiple,
  allSelectable = false as any,
}: Props<T, K, ValueType, Multiple>) {
  const { container = "", button = "" } = classes || {};
  const {
    formState: { isSubmitting, errors },
    field: { value: selected, onChange, ref },
  } = useController<{ [index: string]: VarOption<Multiple, ValueType> }>({
    name: name as any,
  });

  const { resetField } = useFormContext<T>();

  const labelId = `${name}.${labelKey}`;
  const valueKey: keyof OptionType<ValueType> = "value";

  const isAllSelected =
    multiple && (selected as OptionType<ValueType>[]).length === options.length;

  const isDisabled = isSubmitting || disabled;
  return (
    <>
      <Listbox
        disabled={isDisabled}
        value={selected}
        by={valueKey}
        onChange={onChange}
        as="div"
        className={`relative ${container}`}
        multiple={multiple}
      >
        {/** add this so hook-form can focus on this field if didn't pass validation */}
        <input
          ref={ref}
          aria-hidden
          className="peer h-0 w-0 focus:outline-none absolute"
          tabIndex={-1}
        />
        <Listbox.Button
          aria-disabled={isDisabled}
          as={multiple ? "div" : "button"}
          className={`${button} ${selectorButtonStyle} ${
            multiple ? "p-1" : ""
          } min-h-[3rem] justify-between peer-focus:border-gray-d1 peer-focus:dark:border-blue-l2 cursor-pointer`}
        >
          {({ open }) => (
            <>
              <span className="flex flex-wrap gap-2 h-full">
                {getSelectedValues(selected, (opts: OptionType<ValueType>[]) =>
                  onChange(opts)
                )}
              </span>
              <DrawerIcon
                isOpen={open}
                size={25}
                className="justify-self-end dark:text-gray shrink-0"
              />
            </>
          )}
        </Listbox.Button>
        <Listbox.Options className="rounded-sm text-sm border border-prim absolute top-full mt-2 z-10 bg-gray-l5 dark:bg-blue-d6 w-full max-h-[10rem] overflow-y-auto scroller">
          {multiple && (
            <div className="flex p-4">
              {isAllSelected ? (
                <Action onClick={() => onChange([])}>Deselect All</Action>
              ) : (
                allSelectable && (
                  <Action onClick={() => onChange(options)}>Select All</Action>
                )
              )}

              <Action onClick={() => resetField(name)} classes="ml-auto">
                Reset
              </Action>
            </div>
          )}

          {options.map((o) => (
            <Listbox.Option
              key={o.value}
              value={o}
              className={({ active, selected }) => {
                return `px-4 py-2 cursor-pointer ${
                  selected
                    ? "bg-blue-l2  dark:bg-blue-d1"
                    : active
                    ? "cursor-pointer bg-blue-l3 dark:bg-blue-d2"
                    : ""
                }`;
              }}
            >
              {o.label}
            </Listbox.Option>
          ))}
        </Listbox.Options>
        <ErrorMessage
          /**single value, could just validate option.label. multiple on the other hand, should validate option[]*/
          name={(multiple ? name : labelId) as any}
          errors={errors}
          as="p"
          className="absolute -bottom-5 right-0 text-right text-xs text-red dark:text-red-l2"
        />
      </Listbox>
      {children && children(selected as any)}
    </>
  );
}

function getSelectedValues<ValueType extends ValKey, Multiple extends boolean>(
  selected: VarOption<Multiple, ValueType>,
  onChange: (opts: OptionType<ValueType>[]) => void
) {
  if (!Array.isArray(selected)) {
    return selected.label;
  }

  const handleRemove = (value: ValueType) =>
    onChange(selected.filter((x) => x.value !== value));

  return selected.map((opt) => (
    <div
      key={opt.value}
      className="flex items-center px-3 gap-2 h-10 bg-blue-l4 dark:bg-blue-d4 border border-prim rounded font-semibold text-gray-d1 dark:text-gray uppercase"
    >
      <span className="max-w-[200px] truncate">{opt.label}</span>
      <button
        type="button"
        onClick={(e) => {
          e.preventDefault();
          handleRemove(opt.value);
        }}
      >
        <Icon type="Close" size={20} />
      </button>
    </div>
  ));
}

function Action(
  props: PropsWithChildren<{ onClick: () => void; classes?: string }>
) {
  return (
    <button
      type="button"
      className={`${
        props.classes ?? ""
      } cursor-pointer text-blue hover:text-orange hover:underline`}
      onClick={props.onClick}
    >
      {props.children}
    </button>
  );
}
