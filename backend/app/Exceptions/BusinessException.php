<?php

namespace App\Exceptions;

use Exception;

class BusinessException extends Exception
{
    public function render($request)
    {
        return response()->json([
            'message' => $this->message,
            'error' => $this->getLine(),
        ]);
    }
}
