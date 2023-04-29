import Icon from "components/Icon";

type Props = { className: string; onClose: () => void };

export default function MobileTitle({ className, onClose }: Props) {
  return (
    <h3
      className={`${className} flex justify-between items-center w-full px-4 py-3 bg-orange-l6 border-b border-prim font-black text-xl text-orange uppercase dark:bg-blue-d7`}
    >
      Wallet
      <button
        className="flex items-center justify-center w-10 h-10 dark:border-bluegray dark:hover:border-bluegray-d1 text-gray-d2 hover:text-black dark:text-white dark:hover:text-gray"
        onClick={onClose}
      >
        <Icon type="Close" className="w-8 sm:w-7 h-8 sm:h-7" />
      </button>
    </h3>
  );
}
