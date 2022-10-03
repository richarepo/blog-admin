import { useRef } from 'react'
import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react' 
import { useMutation } from 'react-query'
import { queryClient } from '../..'
import { deleteAuthorById } from '../api/author'

const DeleteAuthorPopup=(props:any)=> {
      const {deleteId,onClose,isOpen}=props
      const cancelRef:any = useRef()

  const deleted = useMutation(deleteAuthorById, {
    onSuccess: () => {
      queryClient.invalidateQueries(["fetchAllAuthor"]);
    },
  });

  const authorDetails = (id: string) => {
    deleted.mutate(id);
    onClose();
  };


  return (
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Category
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You want to delete this author.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={() => authorDetails(deleteId)} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
  )
}

export default DeleteAuthorPopup;