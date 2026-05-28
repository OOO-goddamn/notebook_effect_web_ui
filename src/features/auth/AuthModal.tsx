import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from 'Shared/ui/dialog';
import { Field } from 'Shared/ui/field';
import { Label } from 'Shared/ui/label';
import { Input } from 'Shared/ui/input';
import { Button } from 'Shared/ui/button';

interface AuthModalProps {
    name: string;
    onNameChange: (value: string) => void;
    onSubmit: () => void;
}

export const AuthModal = ({ name, onNameChange, onSubmit }: AuthModalProps) => {
    return (
        <Dialog defaultOpen>
            <DialogContent className='sm:max-w-sm'>
                <DialogHeader>
                    <DialogTitle>Регистрация</DialogTitle>
                    <DialogDescription>Введите свое имя</DialogDescription>
                </DialogHeader>
                <Field>
                    <Label htmlFor='name'>Имя</Label>
                    <Input
                        id='name'
                        name='name'
                        value={name}
                        onChange={(e) => onNameChange(e.target.value)}
                    />
                </Field>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={onSubmit} type='submit'>
                            Сохранить
                        </Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
