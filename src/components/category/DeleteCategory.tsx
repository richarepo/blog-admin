import { useRef } from "react";
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from "@chakra-ui/react";
import { deleteCategory } from "../api/category";
import { useMutation } from "react-query";
import { queryClient } from "../..";

const DeleteCategoryPopup = (props: any) => {
  const { deleteId, onClose, isOpen } = props;
  const cancelRef: any = useRef();

  const deleted = useMutation(deleteCategory, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllCategory"]);
    },
  });

  const deleteCategoryDetails = (id: string) => {
    deleted.mutate(id);
    onClose();
  };

  return (
    <AlertDialog
      isOpen={props.isOpen}
      leastDestructiveRef={cancelRef}
      onClose={props.onClose}
    >
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Category
          </AlertDialogHeader>

          <AlertDialogBody>
            Are you sure? You want to delete category.
          </AlertDialogBody>

          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={() => deleteCategoryDetails(deleteId)}
              ml={3}
            >
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  );
};

export default DeleteCategoryPopup;
