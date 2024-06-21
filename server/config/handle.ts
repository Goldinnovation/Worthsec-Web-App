// newHandle.ts
import { Request, Response } from 'express';

function handle(req: Request, res: Response): void {
    // Your handling logic here
    res.send('Handled by newHandle');
}

export default handle;
