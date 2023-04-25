import React from 'react'
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { useMemo, useState } from 'react';

import useUploadGigModal from '../../hooks/useUploadGigModal.js';
import Modal from './Modal.jsx';


const STEPS = {
    CATEGORY: 0,
    INFO: 1,
    COVERIMG: 2,
    PRICE: 3,
}

const UploadGigModal = () => {
  return (
    <div>
      
    </div>
  )
}

export default UploadGigModal
