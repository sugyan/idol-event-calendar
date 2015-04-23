# coding: utf-8
class Calendar < ActiveRecord::Base
  validates :cid, :unitname, :unitname_kana, :presence => true
  validates :cid, :uniqueness => true
  validates :unitname_kana, :format => { with: /\A(?:\p{Hiragana}|ー)+\z/, message: 'はひらがなで入力してください。' }
end
