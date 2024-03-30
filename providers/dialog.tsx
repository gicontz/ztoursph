import { classNames } from '@app/utils/helpers';
import React, { FunctionComponent, useEffect } from 'react';

type ProviderContext = readonly [(option: DialogOption) => void, () => void];
const EMPTY_FUNC = () => {};
const DialogContext = React.createContext<ProviderContext>([EMPTY_FUNC, EMPTY_FUNC]);
export const useDialog = (): ProviderContext => React.useContext(DialogContext);

type DialogParams = {
  children: React.ReactNode;
  open: boolean;
  sc_styles?: string;
  onClose?: () => void;
  onExited?: () => void;
};

type DialogOption = Omit<DialogParams, 'open'>;

type DialogContainerProps = DialogParams & {
  onClose: () => void;
  onKill: () => void;
};

// const BackDrop = styled.div<{ open?: boolean; sc_styles?: string }>`
//   position: fixed;
//   display: ${({ open }) => (open ? 'flex' : 'none')};
//   z-index: 1;
//   margin: 0;
//   padding: 0;
//   top: 0;
//   left: 0;
//   width: 100%;
//   height: 100%;
//   background-color: rgba(0, 0, 0, 0.5);
//   align-items: center;
//   /* Custom Styles */
//   ${({ sc_styles }) => sc_styles}
// `;

// const DialogWrapper = styled.div`
//   display: flex;
//   position: relative;
//   z-index: 2;
//   width: 50vw;
//   max-width: 800px;
//   max-height: 40vh;
//   background-color: #ffffff;
//   display: block;
//   margin: 0 auto;
//   border-radius: 20px;
//   box-sizing: border-box;
// `;

type Props = {
  children: React.ReactNode;
  open?: boolean;
  onClose: () => void;
  onExited: () => void;
};

const Dialog: FunctionComponent<Props> = ({ children, open, onClose }) => {
  const [dialogState, setDialogState] = React.useState({
    open,
  });
  const ref = React.useRef<HTMLDivElement>(null);

  const handleBackDropClick = () => {
    setDialogState({ open: false });
    onClose && onClose();
  };

  const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    setDialogState({ open });
    if (open) {
      window.document.body.style.overflow = 'hidden';
    }
    return () => {
      window.document.body.style.overflow = 'auto';
    };
  }, [open]);

  return (
    <div 
        className={
            classNames(
            "fixed top-0 left-0 z-10 flex items-center justify-center p-0 m-0 w-full h-full bg-[rgba(0, 0, 0, 0.5)]", 
            dialogState.open ? "flex" : "hidden")
        }
        onClick={handleBackDropClick}>
      <div 
        ref={ref} 
        onClick={handleClick} 
        className="dialog-wrapper block relative z-20 w-[50vw] bg-white rounded-lg box-border">
        {children}
      </div>
    </div>
  );
};

function DialogContainer(props: DialogContainerProps) {
  const { children, open, onClose, onKill, ...others } = props;

  return (
    <Dialog open={open} onClose={onClose} onExited={onKill} {...others}>
      {children}
    </Dialog>
  );
}

type DialogProps = {
  children: React.ReactNode;
};

export const DialogProvider: FunctionComponent<DialogProps> = (props: DialogProps) => {
  const { children, ...others } = props;
  const [dialogs, setDialogs] = React.useState<DialogParams[]>([]);
  const createDialog = (option: DialogOption) => {
    const dialog = { ...option, open: true };
    setDialogs((ds) => [...ds, dialog]);
  };
  const closeDialog = () => {
    setDialogs((ds) => {
      const latestDialog = ds.pop();
      if (!latestDialog) return ds;
      if (latestDialog.onClose) latestDialog.onClose();
      return [...ds].concat({ ...latestDialog, open: false });
    });
  };
  const contextValue = React.useRef([createDialog, closeDialog] as const);

  return (
    <DialogContext.Provider value={contextValue.current}>
      {children}
      {dialogs.map((dialog, i) => {
        const { ...dialogParams } = dialog;
        const handleKill = () => {
          if (dialog.onExited) dialog.onExited();
          setDialogs((ds) => ds.slice(0, ds.length - 1));
        };

        return <DialogContainer key={i} onClose={closeDialog} onKill={handleKill} {...dialogParams} {...others} />;
      })}
    </DialogContext.Provider>
  );
};

export default DialogProvider;