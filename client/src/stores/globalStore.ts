import create from 'zustand';
import { devtools } from 'zustand/middleware';

interface GlobalStoreType {
  publicKey: string | undefined;
  setPublicKey: (publicKey: string) => void;
}

const useGlobal = create<
  GlobalStoreType,
  [['zustand/devtools', GlobalStoreType]]
>(
  devtools((set) => ({
    publicKey: undefined,
    setPublicKey: (publicKey_: string) =>
      set(() => ({ publicKey: publicKey_ })),
  })),
);
export default useGlobal;
