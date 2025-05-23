import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'

import { AppDispatch, RootState } from '@/app/store'

/**
 * useAppDispatch: return type of useDispatch √
 * useAppSelector: return type of useSelector √
 */
export const useAppDispatch = () => useDispatch<AppDispatch>()

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
